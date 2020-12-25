const uploadImage = document.querySelector('#file');
uploadImage.addEventListener('change', loadImage);

// load image
function loadImage(event) {
  const image = document.getElementById("imgDisplayed");
  image.src = URL.createObjectURL(event.target.files[0]);
}

const convert = document.querySelector('#convert');
convert.addEventListener('click', convertToPDF);

function convertToPDF() {
  const image = document.getElementById("imgDisplayed");
  const imageUrl =  image.src;
  getBase64FromImageUrl(imageUrl);
}

function getBase64FromImageUrl(url) {
    const img = new Image();

    img.setAttribute('crossOrigin', 'anonymous');
    img.addEventListener('load', toCanvas);
    function toCanvas() {
        const canvas = document.createElement("canvas");
        canvas.width =this.width;
        canvas.height =this.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(this, 0, 0);

        const dataURL = canvas.toDataURL("image/png");
        const urlToSixty = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

        // occupation
        const occName = document.querySelector('#occupation-name').value;

        // contact
        const name = document.querySelector('#user-name').value;
        const address = document.querySelector('.address').value;
        const email = document.querySelector('.email').value;
        const phone = document.querySelector('.phone').value;
        // social
        const website = document.querySelector('.website').value;
        const linkedin = document.querySelector('.linkedin').value;
        const github = document.querySelector('.github').value;

        // certificates
        const certificates = document.querySelectorAll('.certif');
        // Profile
        const profile = document.getElementById('message').value;

        // experience
        const jobTitles = document.querySelectorAll('.job-title');
        const companies = document.querySelectorAll('.company-name');
        const tasks = document.querySelectorAll('.task');
        const dates = document.querySelectorAll('.date');
        const languages = document.querySelectorAll('.language');
        const skills = document.querySelectorAll('.skill');
        const degrees = document.querySelectorAll('.degree');
        const schools = document.querySelectorAll('.school');
        const projects = document.querySelectorAll('.project');
        const levels = document.querySelectorAll('.level');
        const hobbies = document.querySelectorAll('.hobby');
        // const checkboxes = document.getElementsByName('check');

        const doc = new jsPDF();
        //contact to PDF

        // Name and occupation
        doc.setFontSize(21);
        doc.setFontType("bold");
        doc.text(name, 75, 19);
        doc.setFontSize(16);
        doc.setFontType("normal");
        doc.text(occName, 75, 27);

        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Contact", 75, 40);
        // icons
        doc.addImage(iconURIs.phURI, 75, 46, 4, 4);
        doc.addImage(iconURIs.mailURI, 74, 53, 6, 4);
        doc.addImage(iconURIs.addURI, 75, 60, 4, 4);
        doc.addImage(iconURIs.webURI, 138, 46, 4, 4);
        doc.addImage(iconURIs.gitURI, 138, 53, 4, 4);
        doc.addImage(iconURIs.linkedURI, 138, 60, 4, 4);
        doc.setFontSize(10);
        doc.setFontType("normal");
        doc.text(phone, 84, 49);
        doc.text(email, 84, 56);
        doc.text(address, 84, 63);

        //social to PDF
        doc.text(website, 147, 49);
        doc.text(github,147, 56);
        doc.text(linkedin,147, 63);

        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Certificates", 10, 82);
        // certificates
        doc.setFontSize(10);
        doc.setFontType("normal");
        let yPos = 90;
        certificates.forEach(item => {
          const certif = item.value;
          // wrap words helper
          const splitCertif = doc.splitTextToSize(certif, 50);
          doc.text(splitCertif, 10, yPos);
          yPos += 9;
        });

        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Profile", 75, 82);
        // Profile
        doc.setFontSize(10);
        doc.setFontType("normal");
        // wrap words helper
        const splitProfile = doc.splitTextToSize(profile, 128);
        doc.text(splitProfile, 75, 90);

        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Professional Experience", 10, 122);
        // Job title
        doc.setFontSize(10);
        doc.setFontType("bold");
        yPos = 130;
        jobTitles.forEach(item => {
          const job = item.value;
          // wrap words helper
          const splitJob = doc.splitTextToSize(job, 50);
          doc.text(splitJob, 10, yPos);
          yPos += 25;
        });

        // Company
        doc.setFontType("normal");
        yPos = 136;
        companies.forEach(item => {
          const company = item.value;
          // wrap words helper
          const splitCompany = doc.splitTextToSize(company, 50);
          doc.text(splitCompany, 10, yPos);
          yPos += 25;
        });

        // Jobs & Internships periods
        let xPos = 10;
        yPos = 142;
        for (let i = 0; i <= 3; i++) {
          const dateVal = dates[i].value;
          const d = new Date( dateVal );
          const year = d.getFullYear();
          const month = d.toLocaleString('default', { month: 'short' });
          let dateRes = month + " " + year;
          if (i === 0) {
            xPos = 10;
            yPos = 142;
            doc.text("-", 26, yPos);
          } else if ( i % 2 === 0 && i !== 0) {
            xPos = 10;
            yPos += 25;
            doc.text("-", 26, yPos);
          } else {
            xPos = 28;
          }
          doc.text(dateRes, xPos, yPos);
          // doc.text(dateRes, xPos, yPos);
        }

        // Tasks
        yPos = 133;
        tasks.forEach((item, index) => {
          const task = item.value;
          // wrap words helper
          const splitTask = doc.splitTextToSize(task, 128);
          doc.text(splitTask, 75, yPos);
          // Check if index is odd move down by "16" (next job experience),
          // otherwise move by "9"
          index % 2 === 0 ? yPos += 9 : yPos += 16;
        });

        // languages
        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Languages", 10, 180);
        doc.setFontSize(10);
        doc.setFontType("normal");
        yPos = 187;
        languages.forEach(item => {
          const lang = item.value;
          doc.text(lang, 10 , yPos);
          yPos += 6;
        });

        //Levels
        yPos = 187;
        levels.forEach(item => {
          const level = item.value;
          doc.text(level, 30 , yPos);
          yPos += 6;
        });

        // levels
        // function onlyOne(checkbox) {
        //     var checkboxes = document.getElementsByName('check')
        //     checkboxes.forEach((item) => {
        //         if (item !== checkbox) item.checked = false
        //     })
        // }
        //
        // yPos = 202;
        // checkboxes.forEach( item => {
        //   const check = item.value;
        //   doc.text(check, 25, yPos);
        //   yPos += 6;
        // });

        // skills
        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Skills", 10, 218);
        doc.setFontSize(10);
        doc.setFontType("normal");
        yPos = 225;
        xPos = 10;
        for ( let i = 0; i < 15; i++ ) {
          const skill = skills[i].value;
          if ( i === 0 ) {
            xPos = 10
          } else if ( i < 5 && i !== 0 ) {
            yPos += 6;
          } else if ( i >= 5 && i < 10 ) {
            xPos = 30;
            if ( i === 5 ) {
              yPos = 225;
            } else {
              yPos += 6;
            }
          } else {
            xPos = 50;
            if ( i === 10 ) {
              yPos = 225;
            } else {
              yPos += 6;
            }
          }
          doc.text(skill, xPos , yPos);
        }

        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Hobbies", 10, 260);
        doc.setFontSize(10);
        doc.setFontType("normal");
        yPos = 267;
        hobbies.forEach(item => {
          const hobby = item.value;
          doc.text(hobby, 10 , yPos);
          yPos += 6;
        });

        // Education
        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Education", 75, 180);
        // Education periods
        doc.setFontSize(10);
        doc.setFontType("normal");
        xPos = 75;
        yPos = 187;
        for (let i = 4; i <= 9; i++) {
          const dateVal = dates[i].value;
          const d = new Date( dateVal );
          const year = d.getFullYear();
          let dateRes = `${year}`;
          if (i === 4) {
            xPos = 75;
            yPos = 187;
            dateRes += " " + "-" + " ";
          } else if ( i % 2 === 0 && i !== 4) {
            xPos = 75;
            yPos += 17;
            dateRes += " " + "-" + " ";
          } else {
            xPos = 86;
          }
          doc.text(dateRes, xPos, yPos);
        }

        // Degree
        doc.setFontType("bold");
        xPos = 110;
        yPos = 187;
        degrees.forEach(item => {
          const degVal = item.value;
          const splitDegree = doc.splitTextToSize(degVal, 95);
          doc.text(splitDegree, xPos, yPos);
          yPos += 17;
        });
        // University/School
        doc.setFontType("normal");
        xPos = 110;
        yPos = 194;
        schools.forEach(item => {
          const schoolVal = item.value;
          const splitSchool = doc.splitTextToSize(schoolVal, 95);
          doc.text(splitSchool, xPos, yPos);
          yPos += 17;
        });

        // Personal projects
        // header
        doc.setFontSize(14);
        doc.setFontType("bold");
        doc.text("Personal projects", 75, 242);
        // Education periods
        doc.setFontSize(10);
        doc.setFontType("normal");
        // projects
        yPos = 249;
        projects.forEach(item => {
          const project = item.value;
          const splitProj = doc.splitTextToSize(project, 128);
          doc.text(splitProj, 75, yPos);
          yPos += 7;
        });

        // image
        doc.addImage(urlToSixty, 10, 10, 45, 57);

        // open in new window
        doc.output("dataurlnewwindow");
        // save on click
        const down = document.querySelector('#download');
        down.addEventListener('click', downloadPDF);
        function downloadPDF() {
          doc.save('CV.pdf');
        }

    };

    img.src = url;
}
