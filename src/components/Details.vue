<template>
  <div>
    <!-- Navbar-->
    <b-navbar type="light" variant="light" id="navbar" fixed="top">
      <b-navbar-brand href="#" id="navbar-brand">{{ this.jobType }} <i class="fab fa-searchengin"></i> JOBS</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" id="search-input" placeholder="Enter your input" v-model="searchKey" list="my-list-id"></b-form-input>
          <datalist id="my-list-id">
            <option v-for="job in jobRetriveData" :key="job">{{job.key}}</option>
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
      <div sm="12" v-for="job in jobRetriveData" :key="job" v-show="job.title == jobTitle">
        <b-card
          :title="job.title"
          tag="article"
          id="job-card"
        >
          <b-card-text v-if="job.companyName != ''">{{ job.companyName }}</b-card-text>
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
        <b-card
          id="job-card"
        >
          <div v-if="job.jobContent != ''">
            <div class="heading">Job Content</div>
            <div class="block-text">{{ job.jobContent }}</div>
            <div id="border-divider"></div>
          </div>
          <div v-if="job.jobDescription.length">
            <div class="heading">Job Description</div>
            <ul class="ul">
              <li class="block-text" v-for="item in job.jobDescription" :key="item">{{ item.value }}</li>
            </ul>
          </div>
          <img v-if="job.photoUrl != ''" :src="job.photoUrl" width="100%" id="job-image"/>
          <div id="docs-link" v-if="job.docsUrl != ''"><i class="fas fa-link"></i> <b-link :href="job.docsUrl">Document Link</b-link></div>
          <div id="border-divider"></div>
          <div v-if="job.jobRequirements.length">
            <div class="heading">Job Requirements</div>
            <ul class="ul">
              <li class="block-text" v-for="item in job.jobRequirements" :key="item">{{ item.value }}</li>
            </ul>
          </div>
          <div v-if="job.education.length">
            <div class="heading">Educational Requirements</div>
            <ul class="ul">
              <li class="block-text" v-for="item in job.education" :key="item">{{ item.value }}</li>
            </ul>
          </div>
          <div v-if="job.experience.length">
            <div class="heading">Experience Need</div>
            <ul class="ul">
              <li class="block-text" v-for="item in job.experience" :key="item">{{ item.value }}</li>
            </ul>
          </div>
          <div id="border-divider"></div>
          <div v-if="job.jobType != ''">
            <div class="heading">Employment Status</div>
            <div class="block-text"><i class="fas fa-user-clock"></i> {{ job.jobType }}</div>
            <div id="divider"></div>
          </div>
          <div class="heading">Salary</div>
          <div class="block-text"><i class="fas fa-wallet"></i> {{ job.salary }}</div>
          <div id="divider"></div>
          <div v-if="job.compensations != ''">
            <div class="heading">Compensation and other benefits</div>
            <ul class="ul">
              <li class="block-text" v-for="item in job.compensations" :key="item">{{ item.value }}</li>
            </ul>
          </div>
          <div class="heading red">Deadline</div>
          <div class="block-text red"><i class="fas fa-clock"></i> {{ job.deadline }}</div>
          <div id="border-divider"></div>
          <div v-if="job.readBeforeApply != ''">
            <div class="heading green">Read before apply</div>
            <div class="block-text green">{{ job.readBeforeApply }}</div>
            <div id="divider"></div>
          </div>
          <div v-if="job.applicationProcedure != ''">
            <div class="heading green">Apply procedure</div>
            <div class="block-text green">{{ job.applicationProcedure }}</div>
          </div>
          <div v-if="job.companyInfo != ''">
            <div id="border-divider"></div>
            <div class="heading deep-yellow">Company information</div>
            <div class="block-text deep-yellow">{{ job.companyInfo }}</div>
          </div>
          <div id="divider"></div><div id="divider"></div>
          <b-button squared block variant="outline-warning" @click="redirectSource(job.sourceUrl)">Apply</b-button>
        </b-card>
      </div>
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
              <b-input id="inline-form-input-message" placeholder="Message..." v-model="comment"></b-input>
              <b-button id="inline-form-input-btn" type="submit" @click="sunmitComments()">Submit</b-button>
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
  props:['jobType', 'jobTitle'],
  data() {
    return {
      jobRetriveData: [],
      searchKey: '',
      loader: true,
      comment: '',
      showDismissibleAlert: false,
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection(this.jobType).orderBy('createdAt','asc')
    }
  },
  methods: {
    redirectSource: function(url){
      window.open(url);
    },
    sunmitComments: function(){
      if(this.comment != ''){
        this.$emit('comment', this.comment);
        this.comment= '';
        this.dismissCountDown = this.dismissSecs;
      }else{
        alert("Please! Input something.");
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
  margin-left: 10px;
  margin-right: 10px;
}
#job-card{
  /* border: 1px solid springgreen !important; */
  /* border-radius: 0.75rem !important; */
  background-color:snow;
  margin-bottom: 10px;
}
.card-body {
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  margin-top: -5px;
  padding: 1.1rem 1rem 1rem 1rem;
}
.item{
  font-size: 14px;
  font-weight: 500;
}
.value{
  font-size: 12px;
  text-transform: capitalize;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
#divider{
  height: 5px;
}
#border-divider{
  height: 1px;
  background-color: #946c6c29;
  margin: 10px 0;
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
.heading{
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 500;
}
.block-text{
  font-size: 14px;
  margin-top: 2px;
  font-weight: 300;
  text-align: justify;
}
.ul{
  padding-left: 15px;
  margin-bottom: 10px !important;
}
#docs-link{
  margin-bottom: 10px !important;
  margin-top: 5px;
}
.red{
  color: red;
}
.green{
  color: green;
}
.deep-yellow{
  color: #FFA500;
}
.inbox{
  margin: 0;
}
.footer{
  margin: 10px 0 5px;
}
@media (min-width: 1200px){
/* start of desktop styles */
  #it-jobs{
    padding: 0px 15%;
  }
  .card-title {
    font-size: 18px;
  }
  .heading{
    font-size: 16px;
  }
}
@media screen and (min-width: 768px) and (max-width: 991px) {
/* start of large tablet styles */
  .card-title {
    font-size: 20px;
  }
  .heading{
    font-size: 16px;
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
  .block-text{
    font-size: 14px;
  }
  .heading{
    font-size: 16px;
  }
}

@media screen and (max-width: 479px) {
/* start of phone styles */
  #card1{
    background: linear-gradient(to right, springgreen -1%, #33ccff 100%);
  }
  .card-title {
    font-size: 16px;
  }
  .item{
    font-size: 12px;
  }
  .value{
    font-size: 10px;
  }
  .block-text{
    font-size: 12px;
  }
  .heading{
    font-size: 14px;
  }
}
</style>
