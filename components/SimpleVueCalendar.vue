<template>
    <table :class="tableClass">
        <thead>
            <tr class="calendar-title">
                <th v-if="options.show_links == 'true'" class="calendar-prev" @click.prevent="lastMonth">&lt;</th>
                <th :colspan="options.show_links == 'true' ? 5 : 7" v-text="title"></th>
                <th v-if="options.show_links == 'true'" class="calendar-next" @click.prevent="nextMonth">&gt;</th>
            </tr>
            <tr class="calendar-header" v-html="header"></tr>
        </thead>
        <tbody v-html="this.paddingStart + this.dayColumns + this.paddingEnd"></tbody>
    </table>
</template>

<script>
    export default {
        data() {
            return {
                today: null,
                idate: null,
                running: null,
                running_day_count: 1,
                ievents: [],
                options: {
                    show_links: this.show_links,
                    color: this.color,
                    tableClass: this.table_class,
                    months: this.months,
                    days: this.days,
                    daysMin: this.daysMin,
                    dayLetter: this.daysLetter
                }
            }
        },
        props: {
            date: {
                required: true,
            },
            events: {
                required: false,
                default: () => [],
            },
            table_class: {
                required: false,
                default: ''
            },
            show_links: {
                required: false,
                default: 'true',
            },
            months: {
                required: false,
                default: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            },
            days: {
                required: false,
                default: () => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            },
            daysMin: {
                required: false,
                default: () => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
            },
            daysLetter: {
                required: false,
                default: () => ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            },
            color: {
                required: false,
                default: 'turquoise'
            }
        },
        watch: {
            color() {
                this.options.color = this.color;
            },
            idate() {
                this.running = new Date(this.idate);
                this.running_day_count = 1;
                this.$emit('dateChange', this.idate);                
            }
        },
        created() {
            this.today = new Date();
            this.today.setHours(0, 0, 0, 0);

            this.idate = new Date(this.date);
            if (isNaN(this.idate.valueOf())) {
                this.idate = new Date();
            }

            this.idate.setDate(1);
            this.idate.setHours(0, 0, 0, 0);

            this.running = new Date(this.idate);
            this.running_day_count = 1;

            if (this.events && Array.isArray(this.events)) {
                this.events.forEach((item, index) => {
                    item.start = new Date(item.start);
                    item.start.setHours(0, 0, 0, 0);
                    item.end = new Date(item.end);
                    item.end.setHours(0, 0, 0, 0);
                    this.ievents.push(item);
                });
            }
        },
        computed: {
            title() {
                return this.options.months[this.idate.getMonth()] + ' ' + this.idate.getFullYear();
            },
            totalDaysInMonth() {
                return this.daysInMonth(this.idate.getFullYear(), this.idate.getMonth())
            },
            header() {
                return '<th>' + this.options.daysMin.join('</th><th>') + '</th>';
            },
            tableClass() {
                return 'calendar ' + this.options.color + this.options.tableClass;
            },
            paddingStart() {
                let text = '';
                for (let x = 0; x < this.idate.getDay(); x += 1) {
                    text += '<td class="pad"> </td>';
                }
                
                return text;
            },
            dayColumns() {
                let tbody = '';
                
                while (this.running_day_count <= this.totalDaysInMonth) {
                    
                    let events = this.findEvents(this.running);
                                        
                    let today_class = this.running.getTime() === this.today.getTime() ? ' today' : '';

                    let day_class = '';

                    let event_summary = ' ';
                    
                    if (events ) {
                        events.forEach((item) => {
                            if (item.start.getTime() === this.running.getTime()) {
                                day_class += item.mask ? ' mask-start' : '';
                                day_class += item.classes ? ' ' + item.classes : '';
                                event_summary += item.summary || '';
                            } else if (this.running.getTime() > item.start.getTime() && this.running.getTime() < item.end.getTime()) {
                                day_class += item.mask ? ' mask' : '';
                            } else if (this.running.getTime() === item.end.getTime()) {
                                day_class += item.mask ? ' mask-end' : '';
                            }
                        });
                    }

                    tbody += '<td class="day' + day_class + today_class + '" title="' + event_summary + '">';

                    tbody += '<div>' + this.running.getDate() + '</div>';

                    tbody += '<div>' + event_summary + '</div>';

                    tbody += '</td>';

                    if (this.running.getDay() === 6) {
                        tbody += '</tr>';

                        if ((this.running_day_count + 1) <= this.totalDaysInMonth) {
                            tbody += '<tr>';
                        }

                    }

                    this.running.setDate(this.running.getDate() + 1);
                    this.running_day_count += 1;
                }

                return tbody;
            },
            paddingEnd() {
                let html = '';
                let padding_at_end_of_month = 7 - this.running.getDay();

                if (padding_at_end_of_month && padding_at_end_of_month < 7) {
                    for (let x = 1; x <= padding_at_end_of_month; x += 1) {
                        html += '<td class="pad"> </td>';
                    }
                }

                return html;
            },
        },
        methods: {
            nextMonth() {
                this.idate = new Date(this.idate.getFullYear(), this.idate.getMonth() + 1, 1);
            },
            lastMonth() {
                this.idate = new Date(this.idate.getFullYear(), this.idate.getMonth() - 1, 1);
            },
            daysInMonth(year, month) {
                let arr = [31, (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                return arr[month];
            },
            findEvents(day) {
                let found_events = [];
    
                if (this.ievents) {
                    this.ievents.forEach(function(item, index) {
                        if (day.getTime() >= item.start.getTime() && day.getTime() <= item.end.getTime()) {
                            found_events.push(item);
                        }
                    });
                }

                return found_events || false;
            }
        }
    }
</script>