<template>
  <div id="app">
    <router-view v-on:jobType="setJobType" v-on:jobTitle="setJobTitle" v-on:comment="addNewComments" :job-type="jobType" :job-title="jobTitle"/>
    <!-- <div class="bottom-menu">
      <b-nav tabs justified>
        <b-nav-item class="nav-item1" @click="$bvModal.show('bv-modal-example')">SORT</b-nav-item>
        <b-modal id="bv-modal-example" hide-footer hide-header-close hide-header>
          <div class="d-block text-center">
            
          </div>
        </b-modal>
        <b-nav-item class="nav-item2" to="/">HOME</b-nav-item>
      </b-nav>
    </div> -->
  </div>
</template>

<script>
import { comments } from './firebase';
export default {
  name: 'app',
  data: function(){
    return {
      jobType: this.getCookie('jobType'),
      jobTitle: this.getCookie('jobTitle')
    }
  },
  methods: {
    setCookie: function(cookie_name, cookie_value, exdays){
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/";
        return true;
    },
    getCookie: function(cookie_name){
        var name = cookie_name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    setJobType( value ){
      console.log(value);
      if(value != ''){
        this.setCookie('jobType', value , 365);
        this.jobType = value;
      }else{
        this.jobType = this.getCookie('jobType');
      }
    },
    setJobTitle( value ){
      console.log("Find " + value);
      if(value != ''){
        this.setCookie('jobTitle', value , 365);
        this.jobTitle = value;
      }else{
        this.jobTitle = this.getCookie('jobTitle');
      }
    },
    addNewComments( value ){
      comments.add({
        text: value
      })
      .then(function(docRef){
        console.log("Comments written with ID: " + docRef.id);
      })
      .catch(function(error){
        console.log("Error adding comments: " + error);
      })
    }
  }
}
</script>
<style>
* {
  font-family: 'Montserrat', sans-serif;
}
::-webkit-scrollbar { 
    display: none; 
}

/** Navbar Design */
#navbar{
  background-color: snow !important;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  border-bottom: 1px solid #d2d2d2;
}
#navbar-brand{
  text-transform: uppercase;
}
.navbar-nav .form-inline{
  flex-flow: inherit !important;
}
#search-input{
  border-radius: .6rem;
  margin-right: 0rem !important;
}
.fixed-top{
  right: -5px !important;
}
#menu{
  font-size: 25px;
  padding: 3px 0px 0px 10px;
}
.modal-dialog{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) !important;
  -webkit-transform: translate(-50%, -50%) !important;
  margin: 0rem;
  width: 95%;
}
.nav-link{
  padding: 0 0 0 .5rem !important;
  background-color: snow !important;
  border: none !important;
  font-size: 24px;
  color: #000 !important;
}
/** Navbar Media */
@media (min-width: 1200px){
/* start of desktop styles */
  
}
@media screen and (max-width: 991px) {
/* start of large tablet styles */
  
}

@media screen and (max-width: 767px) {
/* start of medium tablet styles */

}

@media screen and (max-width: 479px) {
/* start of phone styles */
  
}

/** Loader Custom*/
.lds-ellipsis, .lds-ring{
  z-index: 1;
  position:absolute;
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  top: 150px;
}

/** Loader Default */
.lds-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
#loaderText{
  position: relative; 
  top: 100px; 
  color: #6c757d;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 51px;
  height: 51px;
  margin: 6px;
  border: 2px solid #6c757d;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #6c757d transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/** Bottom Menu Bar */
.bottom-menu{
  border-top: 1px solid #d2d2d2;
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: snow;
}
.nav-item .nav-link{
  color: #000 !important;
}
.nav-item1:hover{
  background-color: #0000000a;
}
.nav-item2:hover{
  background-color: #0000000a;
}

/** Footer */
.inbox{
  margin: 0 10px;
  text-align: center;
  margin-bottom: 10px;
}
.inbox-icon{
  font-size: 22px;
  color: #a7a7a7;
}
.inbox-text{
  margin-top: 5px;
  font-size: 16px;
  color: #a7a7a7;
  text-transform: uppercase;
}
.inbox-form{
  margin-top: 10px;
}
#inline-form-input-btn{
  background-color: #a7a7a7;
  border-color: #a7a7a7;
}
#inline-form-input-message, #inline-form-input-btn{
  border-radius: 0;
}
.input-group{
  margin: 0 auto;
}
/** Footer */
.footer{
  margin: 0 10px;
  text-align: center;
  margin-bottom: 10px;
}
.footer .card{
  background-color: #a7a7a7;
}
.footer-icon{
  margin-top: 30px;
}
.footer-icon img{
  width: 5%;
}
@media screen and (max-width: 991px) {
/* start of large tablet styles */
  .footer-icon img{
    width: 6%;
  }
}
@media screen and (max-width: 767px) {
/* start of medium tablet styles */
  .footer-icon img{
    width: 7%;
  }
}

@media screen and (max-width: 479px) {
/* start of phone styles */
  .footer-icon img{
    width: 8%;
  }
}
.footer-text{
  margin-top: 30px;
  font-size: 16px;
  color: #fff;
  text-transform: uppercase;
}

/** Other */
#footer-border-divider{
  height: 1px;
  background-color: #fff;
  margin: 25px 10%;
}
.footer-navbar{
  margin: 0px 5px 20px;
  color: #fff;
}
.footer-link{
  color: #fff;
  font-size: 20px;
  padding: 0 10px;
  cursor: pointer;
}

/** Navbar */
.sidenav {
  height: 0%;
  width: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  right: 0;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  text-align:center;
}

.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #fff !important;
  display: block;
  transition: 0.3s;
  font-size: 20px;

}

.sidenav a:hover{
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
.navLinks{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) !important;
  -webkit-transform: translate(-50%, -50%) !important;
}
</style>
