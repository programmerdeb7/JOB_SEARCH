<template>
  <div>
    <!-- Navbar-->
    <b-navbar type="light" variant="light" id="navbar" fixed="top">
      <b-navbar-brand href="#" id="navbar-brand">KHULNA <i class="fab fa-searchengin"></i> JOBS</b-navbar-brand>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" id="search-input" placeholder="Search catagory..." v-model="searchKey" list="my-list-id"></b-form-input>
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
    <div id="job-content">
      <!-- <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div> -->
      <div class="lds-ring" v-if="loader"><span id="loaderText">Loading</span><div></div><div></div><div></div><div></div></div>
      <b-row>
        <b-col sm="6" v-for="(job, idx) in jobRetriveData" :key="idx" v-show="job.key == searchKey">
          <router-link :to="job.url">
            <b-card
              :title="job.type"
              tag="article"
              id="job-card"
              @click="passJobType(job.key)"
            >
              <b-card-text>{{ job.description }}</b-card-text>
              <b-button id="job-card-explore-btn" size="sm">
                Explore all {{job.count}}
              </b-button>
            </b-card>
          </router-link>
        </b-col>
        <b-col sm="6" v-for="(job, idx) in jobRetriveData" :key="idx" v-show="searchKey == '' && job.catagory == 'general'">
          <router-link :to="job.url">
            <b-card
              :title="job.type"
              tag="article"
              id="job-card"
              @click="passJobType(job.key)"
            >
              <b-card-text>{{ job.description }}</b-card-text>
              <b-button id="job-card-explore-btn" size="sm">
                Explore all {{job.count}}
              </b-button>
            </b-card>
          </router-link>
        </b-col>
      </b-row>
      <b-alert show variant="success" class="catagoryTitle" v-if="!loader" v-show="searchKey == ''">ENGINEERING</b-alert>
      <b-row>
        <b-col sm="6" v-for="(job, idx) in jobRetriveData" :key="idx" v-show="searchKey == '' && job.catagory == 'engineering'">
          <router-link :to="job.url">
            <b-card
              :title="job.type"
              tag="article"
              id="job-card"
              @click="passJobType(job.key)"
            >
              <b-card-text>{{ job.description }}</b-card-text>
              <b-button id="job-card-explore-btn" size="sm">
                Explore all {{job.count}}
              </b-button>
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
              <b-input id="inline-form-input-message" placeholder="Message..." v-model="comment"></b-input>
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
import { db, homePageStatus } from '../firebase.js';
export default {
  data() {
    return {
      jobRetriveData: [],
      searchKey: '',
      loader: true,
      comment: '',
      dismissSecs: 5,
      dismissCountDown: 0
    }
  },
  firestore(){
    return {
      jobRetriveData: db.collection('jobs').orderBy('createdAt','asc')
    }
  },
  methods: {
    passJobType: function(jobType){
      this.$emit('jobType', jobType);
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
      if(this.jobRetriveData.length > 1){
        this.loader = false;
        homePageStatus.add({
          createdAt: Date()
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/** Component block start */
#job-content{
  margin-top: 51px;
}
.row{
  margin-right: 0 !important;
  margin-left: 0 !important;
}
#job-card{
  /* border: 1px solid springgreen !important; */
  /* border-radius: 0.75rem !important; */
  background-color:snow;
  margin-bottom: 10px;
  /* background: linear-gradient(to right, springgreen -1%, #33ccff 100%); */
  color: #000;
}
#job-card:hover{
  cursor: pointer;
  background: linear-gradient(to right, springgreen -1%, #33ccff 100%);
  /* -moz-box-shadow:    inset 0 0 10px #33ccff;
  -webkit-box-shadow: inset 0 0 10px #33ccff;
  box-shadow:         inset 0 0 10px #33ccff; */
  border: 1px solid #fff;
}
#job-card-explore-btn{
  color: #000;
  border: 1px solid #fff;
  background-color: #50454542;
}
#job-card:hover #job-card-explore-btn{
  color: #000;
  /* background: linear-gradient(to right, springgreen -1%, #33ccff 100%); */
  border: 1px solid white;
}

/** Card Default */
.card-body {
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  margin-top: -5px;
  padding: 1.1rem 1rem 1rem 1rem;
}
.card-text{
  margin-bottom: 10px;
  text-align: justify;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.card-title {
  margin-bottom: 10px;
  text-decoration: none;
  text-transform: uppercase;
}
.col-sm-6{
  padding-right: 10px !important;
  padding-left: 10px !important;
}

/** Card Media */
@media (min-width: 1200px){
/* start of desktop styles */
  #job-content{
    padding: 10px 15% 0;
  }
  #job-card-explore-btn{
    padding: 4px 8px;
  }
  .card-title {
    font-size: 20px;
  }
  .card-text{
    font-size: 14px;
  }
  #job-card-explore-btn{
    font-size: 13px;
  }
}
@media screen and (min-width: 768px) and (max-width: 1199px) {
/* start of large tablet styles */
  #job-content{
    padding: 10px 0 0;
  }
  #job-card-explore-btn{
    padding: 4px 8px;
  }
  .card-title {
    font-size: 20px;
  }
  .card-text{
    font-size: 16px;
  }
  #job-card-explore-btn{
    font-size: 13px;
  } 
}

@media screen and (min-width: 480px) and (max-width: 767px) {
/* start of medium tablet styles */
  #job-content{
    padding: 10px 0 0;
  }
  .card-title {
    font-size: 18px;
  }
  .card-text{
    font-size: 14px;
  }
  #job-card-explore-btn{
    font-size: 13px;
  }
}
.catagoryTitle{
  text-align: center;
  margin: 0 10px 10px;
  background-color: snow;
  color: #000;
}
@media screen and (max-width: 479px) {
/* start of phone styles */
  #job-content{
    padding: 10px 0 0;
  }
  .card-title {
    font-size: 18px;
  }
  .card-text{
    font-size: 14px;
  }
  #job-card-explore-btn{
    font-size: 12px;
  }
}

/*************************************************************************** */

/** Router link */
a:-webkit-any-link {
  color: #000;
  text-decoration: none;
}

</style>
