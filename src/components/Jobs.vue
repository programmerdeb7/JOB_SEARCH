<template>
  <div>
    <!-- Navbar-->
    <b-navbar type="light" variant="light" id="navbar" fixed="top">
      <b-navbar-brand href="#" id="navbar-brand">{{ this.jobType }} <i class="fab fa-searchengin"></i> JOBS</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" id="search-input" placeholder="Search location..." v-model="searchKey" list="my-list-id"></b-form-input>
          <datalist id="my-list-id">
            <option v-for="location in locations" :key="location">{{ location }}</option>
          </datalist>
          <span id="menu" @click="openNav()"><i class="fas fa-bars"></i></span>
          <!-- Navbar -->
          <div id="mySidenav" class="sidenav">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
            <div class="navLinks">
              <a href="#">Home</a>
              <a href="#">About</a>
              <a href="#">Services</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>

    <!-- Component block start-->
    <div id="it-jobs">
      <!-- <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> -->
      <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
      <b-row>
        <b-col sm="12" v-for="job in jobRetriveData" :key="job" v-show="job.location == searchKey">
          <router-link to="job_details">
            <b-card
              :title="job.title"
              tag="article"
              id="job-card"
              @click="passJobTitle(job.title)"
            >
              <b-card-text>{{ job.companyName }}</b-card-text>
              <b-row class="justify-content-md-center">
                <b-col col sm="6" class="item">Vacancies</b-col>
                <b-col col sm="6" class="item">Deadline</b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col col sm="6" class="value"><i class="fas fa-user-friends"></i> {{ job.vacancies }}</b-col>
                <b-col col sm="6" class="value"><i class="fas fa-clock"></i> {{ job.deadline }}</b-col>
              </b-row>
              <div id="divider"></div>
              <b-row class="justify-content-md-center">
                <b-col col sm="6" class="item">Location</b-col>
                <b-col col sm="6" class="item">Salary</b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col col sm="6" class="value"><i class="fas fa-plane"></i> {{ job.location }}</b-col>
                <b-col col sm="6" class="value"><i class="fas fa-wallet"></i> {{ job.salary }}</b-col>
              </b-row>
            </b-card>
          </router-link>
        </b-col>
        <b-col sm="12" v-for="job in jobRetriveData" :key="job" v-show="searchKey == ''">
          <router-link to="job_details">
            <b-card
              :title="job.title"
              tag="article"
              id="job-card"
              @click="passJobTitle(job.title)"
            >
              <b-card-text>{{ job.companyName }}</b-card-text>
              <b-row class="justify-content-md-center">
                <b-col col sm="6" class="item">Vacancies</b-col>
                <b-col col sm="6" class="item">Deadline</b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col col sm="6" class="value"><i class="fas fa-user-friends"></i> {{ job.vacancies }}</b-col>
                <b-col col sm="6" class="value"><i class="fas fa-clock"></i> {{ job.deadline }}</b-col>
              </b-row>
              <div id="divider"></div>
              <b-row class="justify-content-md-center">
                <b-col col sm="6" class="item">Location</b-col>
                <b-col col sm="6" class="item">Salary</b-col>
              </b-row>
              <b-row class="justify-content-md-center">
                <b-col col sm="6" class="value"><i class="fas fa-plane"></i> {{ job.location }}</b-col>
                <b-col col sm="6" class="value"><i class="fas fa-wallet"></i> {{ job.salary }}</b-col>
              </b-row>
            </b-card>
          </router-link>
        </b-col>
      </b-row>
      <!-- Inbox -->
      <div class="inbox" v-if="!loader">
        <b-card>
          <b-alert
            :show="dismissCountDown"
            dismissible
            variant="success"
            @dismissed="dismissCountDown=0"
            @dismiss-count-down="countDownChanged"
          >
            Thank you for your contribution!
          </b-alert>
          <div class="inbox-icon">
            <i class="fas fa-location-arrow"></i>
          </div>
          <div class="inbox-text">
            <span>WANT SOME INBOX LOVE?</span>
          </div>
          <b-form inline class="inbox-form">
            <b-input-group>
              <b-input id="inline-form-input-message" v-model="comment" placeholder="Message..."></b-input>
              <b-button id="inline-form-input-btn" @click="sunmitComments()">Submit</b-button>
            </b-input-group>
          </b-form>
        </b-card>
      </div>
      <!-- Footer -->
      <div class="footer" v-if="!loader">
        <b-card>
          <div class="footer-icon">
            <img src="https://firebasestorage.googleapis.com/v0/b/vue-simple-project-01.appspot.com/o/logo.png?alt=media&token=28f1d208-ac5c-45ea-a97e-d2e028e372ba" />
          </div>
          <div class="footer-text">
            <span>This is a smaller way to find and get a govt job</span>
          </div>
          <div id="footer-border-divider"></div>
          <div class="footer-navbar">
            <i class="fab fa-facebook footer-link"></i>
            <i class="fab fa-facebook-messenger footer-link"></i>
            <i class="fab fa-google-plus footer-link"></i>
            <i class="fab fa-youtube footer-link"></i>
            <i class="fab fa-google-drive footer-link"></i>
          </div>
        </b-card>
      </div>
      <!-- Component block end -->
    </div>
  </div>
</template>

<script>
import { db } from '../firebase.js';
export default {
  props:['jobType'],
  data() {
    return {
      jobRetriveData: [],
      searchKey: '',
      loader: true,
      comment: '',
      showDismissibleAlert: false,
      dismissSecs: 5,
      dismissCountDown: 0,
      locations: ['Khulna','Satkhira','Jessore','Chuadanga','Narail','Bagerhat','Magura','Jhenaidah']
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection(this.jobType).orderBy('createdAt','desc'),
    }
  },
  methods: {
    passJobTitle: function(value){
      this.$emit('jobTitle', value);
    },
    sunmitComments: function(){
      if(this.comment != ''){
        this.$emit('comment', this.comment);
        this.comment= '';
        this.dismissCountDown = this.dismissSecs;
      }else{
        alert("Please! Input something.")
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    openNav: function(){
      document.getElementById("mySidenav").style.height = "100%";
    },
    closeNav: function(){
      document.getElementById("mySidenav").style.height = "0";
    }
  },
  watch: {
    'jobRetriveData': function(){
      if(this.jobRetriveData.length > 0){
        this.loader = false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/** Navbar */



/** Component block start */
#it-jobs{
  margin-top: 61px;
}
.row{
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.col-sm-12{
  padding-right: 10px !important;
  padding-left: 10px !important;
}
#job-card{
  /* border: 1px solid springgreen !important; */
  /* border-radius: 0.75rem !important; */
  background-color:snow;
  margin-bottom: 10px;
}
#job-card:hover{
  cursor: pointer;
  background: linear-gradient(to right, springgreen -1%, #33ccff 100%);
  color: #000;
  /* -moz-box-shadow:    inset 0 0 10px springgreen;
  -webkit-box-shadow: inset 0 0 10px springgreen;
  box-shadow:         inset 0 0 10px springgreen; */
}
.item{
  font-size: 14px;
  font-weight: 500;
  padding-left: 0;
}
.value{
  font-size: 12px;
  padding-left: 0;
  text-transform: capitalize;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
#divider{
  height: 5px;
}
.card-title{
  text-transform: uppercase;
  margin-bottom: 5px;
}
.card-text {
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: capitalize;
}
/** Card Default */
.card-body {
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  margin-top: -5px;
  padding: 1.1rem 1rem 1rem 1rem;
}
.card-text{
  color: #000;
}
.card-title {
  color: #000;
  text-transform: uppercase;
}

/** Card Media */
@media (min-width: 1200px){
/* start of desktop styles */
  #it-jobs{
    padding: 0px 15%;
  }
  .card-title {
    font-size: 18px;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
/* start of large tablet styles */
  .card-title {
    font-size: 18px;
  }
}

@media screen and (min-width: 480px) and (max-width: 767px) {
/* start of medium tablet styles */
  .card-title {
    font-size: 18px;
  }
  .item{
    font-size: 12px;
  }
  .value{
    font-size: 10px;
  }
}

@media screen and (max-width: 479px) {
/* start of phone styles */
  .card-title {
    font-size: 16px;
  }
  .item{
    font-size: 12px;
  }
  .value{
    font-size: 10px;
  }
}

/*************************************************************************** */

/** Router link */
a:-webkit-any-link {
  color: #000;
  text-decoration: none;
}

</style>
