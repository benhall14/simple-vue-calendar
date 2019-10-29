# Simple Vue Calendar

A simple, **lightweight**,  event-driven **calendar** component for **Vue 2**. This plugin will allow you to generate calendars with 8 responsive color schemes to choose from or add your own stylesheet.

Based on my jQuery calendar plugin found here: [https://github.com/benhall14/jquery-calendar](https://github.com/benhall14/jquery-calendar).

# Installation
To install the Vue component globally, use:
```
npm install --save simple-vue-calendar
```
This will add the `simple-vue-calendar` component to your project.

```js
import SimpleVueCalendar from 'simple-vue-calendar'

Vue.use(SimpleVueCalendar)
```

You can also add the component locally using something like:
```js
// NewComponent.vue
<template>
...
<simple-vue-calendar></simple-vue-calendar>
...
</template>

<script>
...
import { SimpleVueCalendar } from 'simple-vue-calendar'
export default {
    components: {
        SimpleVueCalendar
    },
}
...
</script>
```


# CSS
You can import the 8 responsive color schemes by using the following:
```js
import 'simple-vue-calendar/dist/simple-vue-calendar.css'
```
The default CSS references the 'Oxygen' font on Google Fonts. You can use this too, by adding the following to your projects HTML head:
```html
<link href="https://fonts.googleapis.com/css?family=Oxygen:400,700" rel="stylesheet">
```

# Basic Usage

In its most simplest form, you can create a calendar component using the following:
```html
<simple-vue-calendar date="2019/10/31"></simple-vue-calendar>
```
This will render a calendar for October 2019. You can swap out the date,  or use somthing like:
```html
<simple-vue-calendar :date="date"></simple-vue-calendar>
<script>
...
    data() {
        return {
            date: new Date(),
    	}
	}
...
</script>
```
This way, you can update your date data at any time, and the calendar will react to the change and re-render the calendar for the new date.

# Calendar Events
You can mark or mask off dates on the calendar by simply passing an array of event data points, in the following format:
```html
<simple-vue-calendar :date="date" :events="events"></simple-vue-calendar>
<script>
...
    data() {
        return {
            date: new Date(),
            events: [
                {
                    start: '2019/10/31',
                    end: '2019/10/31',
                    summary: "Halloween",
                    mask: true
                },
                {
                    start: '2019/11/05',
                    end: '2019/11/20',
                    summary: "Example Event #2",
                    mask: true
                },
                {
                    start: '2019/10/02',
                    end: '2019/10/07',
                    summary: "Example Event #3",
                    mask: true
                }
            ]
    }
}
...
</script>
```

# Emitted Events

When the date of the calendar changes, such as clicking previous/next months, the `calendarchange` event is emitted for you to listen for and attach any custom functionality.

```html
<simple-vue-calendar :date="date" @dateChange="handleDateChange"></simple-vue-calendar>
...
<script>
...
	data() {
		date: '2019/10/31',
	},
	methods: {
		handleDateChange(event) {
			// add your custom logic here
		},
	}
...
</script>
```
# Options
I've added a few customizable options too, which you can override by passing the following props:

#### table_class
Any additional classes that you would like to add to the main calendar table.

#### show_links
Either "true" or "false". Passing "false" will remove the links for the previous/next months and fix the calendar in the current month.

#### months
An array of month names. Default:
`['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],`

#### days
An array of day names. Default:
`[['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],`

#### daysMin
An array of short day names. Default: 
`['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],`

#### daysLetter
An array of day letters. Default:
`['S', 'M', 'T', 'W', 'T', 'F', 'S'],`

#### color
If you're using the included CSS stylesheet, you can use any of the following to change the color scheme of the calendar: **`purple, pink, orange, yellow, green, grey, blue`**. By default, the **`turquoise`** color will be selected.

You can demo the different color schemes at [https://conobe.co.uk/projects/simple-vue-calendar](https://conobe.co.uk/projects/simple-vue-calendar) 

# Requirements
This component is built to be used with Vue 2.

# License
Copyright (c) Benjamin Hall, ben@conobe.co.uk
[https://conobe.co.uk](https://conobe.co.uk) 

Licensed under the MIT license

# Donate?
If you find this project helpful or useful in any way, please consider getting me a cup of coffee - It's really appreciated :)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://paypal.me/benhall14)