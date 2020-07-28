$(function () {
  $('.btn-camera').click(function(){
      runCam()
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

          // console.log(content)
          // window.alert(content)
          window.location.replace(content); // send data to the submit function using ajax

          self.scans.unshift({ date: +(Date.now()), content: content });
          viewScans(self.scans)
        });
        Instascan.Camera.getCameras().then(function (cameras) {
          self.cameras = cameras;
          if (cameras.length > 0) {
            self.activeCameraId = cameras[0].id;
            self.scanner.start(cameras[0]);
            document.getElementById('cameras').innerHTML = self.cameras[0].name
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


  function viewScans(scans){

    var scanView =''
    for (var i = 0; i<scans.length ; i++)
    {
      scanView +=  '<div class="sc">' + scans[i].content +'</div></br>'
    }
    console.log(scanView)
    document.getElementById('scansView').innerHTML = scanView
  }
})


