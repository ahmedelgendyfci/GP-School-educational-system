$(function () {
  flag = true
  $('.closeCam').addClass('d-none')
  $('.cam').click(function(){
    if(flag) {
      runCam()
      $('.openCam').addClass('d-none')
      $('.closeCam').removeClass('d-none')
    }
    else {
      location.reload();

      $('.closeCam').addClass('d-none')
      $('.openCam').removeClass('d-none')
    }
    flag = !flag
  })


  function runCam(){
      var app = new Vue({
        el: '#app',
        data: {
          scanner: null,
          activeCameraId: null,
          cameras: [],
          scans: []
        },
        mounted: function () {
          var self = this;
          self.scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5 });
          self.scanner.addListener('scan', function (content, image) {
            console.log(content)
            window.alert(content)
            // window.location.replace(content); // send data to the submit function using ajax
            self.scans.unshift({ date: +(Date.now()), content: content });

          });

          Instascan.Camera.getCameras().then(function (cameras) {

            self.cameras = cameras;
            if (cameras.length > 0) {

              self.activeCameraId = cameras[0].id;
              self.scanner.start(cameras[0]);
            } else {
              console.error('No cameras found.');
            }
          }).catch(function (e) {
            console.error(e);
          });
        },
        methods: {
          formatName: function (name) {
            return name || '(unknown)';
          },
          selectCamera: function (camera) {
            this.activeCameraId = camera.id;
            this.scanner.start(camera);
          }
        }
      });
  }
})


