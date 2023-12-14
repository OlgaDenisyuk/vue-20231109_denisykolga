import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupDescription from './MeetupDescription.js';
import MeetupCover from './MeetupCover.js';
import MeetupInfo from './MeetupInfo.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';
import MeetupAgenda from './MeetupAgenda.js';
import MeetupView from './MeetupView.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
    name: 'PageMeetup',

    components: {
        UiAlert,
        UiContainer,
        MeetupDescription,
        MeetupCover,
        MeetupInfo,
        MeetupAgendaItem,
        MeetupAgenda,
        MeetupView,
    },

    props: {
        meetupId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            meetup: null,
        }
    },

    async mounted() {
        let meetup = await fetchMeetupById(this.meetupId);
        this.meetup = meetup;
    },

    watch: {
        async meetupId(newValue, oldValue) {
            let meetup = await fetchMeetupById(newValue);
            this.meetup = meetup;
        }
    },

    template: `
    <div class="page-meetup">
        <!-- meetup view -->
        <MeetupView v-if="meetup" :meetup="meetup" />
        <UiContainer v-else>
          <UiAlert>Загрузка...</UiAlert>
        </UiContainer>
        <UiContainer v-if="!meetupId">
          <UiAlert>error</UiAlert>
        </UiContainer>
    </div>`,
});
