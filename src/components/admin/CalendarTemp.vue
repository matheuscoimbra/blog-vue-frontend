<template>
    <div class="calendar-parent">

        <calendar-view
            :events="artigos"
            :show-date="showDate"
            :time-format-options="{hour: 'numeric', minute:'2-digit'}"
            :enable-drag-drop="true"
            :disable-past="disablePast"
            :disable-future="disableFuture"
            :show-event-times="showEventTimes"
            :display-period-uom="displayPeriodUom"
            :display-period-count="displayPeriodCount"
            :starting-day-of-week="startingDayOfWeek"
            :class="themeClasses"
            :period-changed-callback="periodChanged"
            :current-period-label="useTodayIcons ? 'icons' : ''"
            @drop-on-date="onDrop"
            @click-date="onClickDay"
            @click-event="onClickEvent"
    >
        <calendar-view-header
                slot="header"
                slot-scope="{ headerProps }"
                :header-props="headerProps"
                @input="setShowDate"
        />
    </calendar-view>
    </div>
</template>

<script>
    import { CalendarView, CalendarViewHeader } from "vue-simple-calendar"

    require("vue-simple-calendar/static/css/default.css")
    require("vue-simple-calendar/static/css/holidays-us.css")

    export default {
        name: "CalendarTemp",
        components: {
            CalendarView,
            CalendarViewHeader,
        },
        data: function() {
            return {

                artigos:[],
                showDate: this.thisMonth(1),
                message: "",
                startingDayOfWeek: 0,
                disablePast: false,
                disableFuture: false,
                displayPeriodUom: "month",
                displayPeriodCount: 1,
                showEventTimes: true,
                newEventTitle: "",
                newEventStartDate: "",
                newEventEndDate: "",
                useDefaultTheme: true,
                useHolidayTheme: true,
                useTodayIcons: false,

            }
        },
        computed: {
            userLocale() {
                return this.getDefaultBrowserLocale
            },

            themeClasses() {
                return {
                    "theme-default": this.useDefaultTheme,
                    "holiday-us-traditional": this.useHolidayTheme,
                    "holiday-us-official": this.useHolidayTheme,
                }
            },
        },
        methods: {
            loadArticlesList(){

                this.$http.get('/artigo/lista').then(
                    res => {
                        this.artigos = res.data
                        console.log(this.artigos)
                    }
                )
            },
            periodChanged(range, eventSource) {
                // Demo does nothing with this information, just including the method to demonstrate how
                // you can listen for changes to the displayed range and react to them (by loading events, etc.)
                console.log(eventSource)
                console.log(range)
            },
            thisMonth(d, h, m) {
                const t = new Date()
                return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
            },
            onClickDay(d) {
                this.message = `Artigo: ${d.toLocaleDateString()}`

            },
            onClickEvent(e) {
                this.message = `Artigo: ${e.title}`
                this.$router.push({
                    name: 'articleById',
                    params: { id: e.id, post_slug: e.title.replace('s+', '-')}
                })
            },
            setShowDate(d) {
                this.message = `Changing calendar view to ${d.toLocaleDateString()}`
                this.showDate = d
            },
            onDrop(event, date) {
                this.message = `You dropped ${event.id} on ${date.toLocaleDateString()}`
                // Determine the delta between the old start date and the date chosen,
                // and apply that delta to both the start and end date to move the event.
                const eLength = this.dayDiff(event.startDate, date)
                event.originalEvent.startDate = this.addDays(event.startDate, eLength)
                event.originalEvent.endDate = this.addDays(event.endDate, eLength)
            },

        },
        mounted() {
            this.loadArticlesList()

        }
    }
</script>

<style scoped>
    .calendar-parent {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        overflow-x: hidden;
        overflow-y: hidden;
        min-height: 95vh;
        background-color: white;
    }
    /* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
    .cv-wrapper.period-month.periodCount-2 .cv-week,
    .cv-wrapper.period-month.periodCount-3 .cv-week,
    .cv-wrapper.period-year .cv-week {
        min-height: 6rem;
    }
    /* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */
    /* Add some styling for events tagged with the "birthday" class */
    .theme-default .cv-event.birthday {
        background-color: #e0f0e0;
        border-color: #d7e7d7;
    }
    .theme-default .cv-event.birthday::before {
        content: "\1F382"; /* Birthday cake */
        margin-right: 0.5em;
    }

    .theme-default .cv-event.purple {
        background-color: #2fc483;
        border-color: #e7d7f7;
    }

    .theme-default .cv-event.orange {
        background-color: #ffe7d0;
        border-color: #2fc483;
    }
</style>