$(function() {
  $("#home_nav_link").click(function() {
    let billboard = document.getElementById("billboard");
    billboard.scrollIntoView({ behavior: "smooth", block: "center" }, true);
  });

  $("#statement_nav_link").click(function() {
    let statement = document.getElementById("statement");
    statement.scrollIntoView({ behavior: "smooth" }, true);
  });

  $("#connect_nav_link").click(function() {
    let connect = document.getElementById("connect_with_me");
    connect.scrollIntoView({ behavior: "smooth" }, true);
  });
  $("#donate_nav_link").click(function() {
    let donate = document.getElementById("donate");
    donate.scrollIntoView({ behavior: "smooth", block: "center" }, true);
  });
  $("#endorsement_nav_link").click(function() {
    let endorse = document.getElementById("endorsed_by");
    endorse.scrollIntoView({ behavior: "smooth", block: "start" }, true);
  });

  $("#donate_button").click(function() {
    let donate = document.getElementById("donate");
    donate.scrollIntoView({ behavior: "smooth" }, true);
  });

  // $(".contact_form_inputs_buttons").click(function() {
  //   $(this).removeAttr("placeholder");
  //   // let placeholder = $("#fname").attr("placeholder");
  //   // placeholder.val("");
  // });
  $("#connect_submit_button").click(function(event) {
    event.preventDefault();
    let firstName = $("#fname")
      .val()
      .trim();
    let email = $("#email")
      .val()
      .trim();
    let message = $("#message")
      .val()
      .trim();
    let regEx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    document.getElementById("message_break").innerHTML = "<p><p>";
    document.getElementById("email_break").innerHTML = "<p><p>";
    document.getElementById("name_break").innerHTML = "<p><p>";

    if (firstName === "") {
      let errorMessageName = "Please enter your first name.";
      document.getElementById("name_break").innerHTML =
        "<p>" + errorMessageName + "<p>";
    }

    if (!regEx.test(email)) {
      let errorMessageEmail = "Please enter a valid email address";
      document.getElementById("email_break").innerHTML =
        "<p>" + errorMessageEmail + "<p>";
    }

    if (message === "") {
      let errorMessageMessage = "Please enter a message.";
      document.getElementById("message_break").innerHTML =
        "<p>" + errorMessageMessage + "<p>";
    }

    if (regEx.test(email) && firstName != "" && message != "") {
      window.location.href = `mailto:connect@shelleydally.com?subject=Hi, Shelly this is, ${firstName}&body=Dear Shelley, 
      ${message}.
      Sincerely,
      ${firstName}`;
      $("#fname").val("");
      $("#email").val("");
      $("#message").val("");
      alert(`Thank you for your input!`);
    }
  });

  $("#endorse_button").click(function(event) {
    event.preventDefault();
    let firstName = $("#f_endorse_name")
      .val()
      .trim();
    let lastName = $("#l_endorse_name")
      .val()
      .trim();
    let occupation = $("#occupation")
      .val()
      .trim();

    document.getElementById("endorse_fname_break").innerHTML = "<p><p>";
    document.getElementById("endorse_lname_break").innerHTML = "<p><p>";
    document.getElementById("occupation_break").innerHTML = "<p><p>";

    if (firstName === "") {
      let errorMessageName = "Please enter your first name.";
      document.getElementById("endorse_fname_break").innerHTML =
        "<p>" + errorMessageName + "<p>";
    }

    if (lastName === "") {
      let errorMessageLastName = "Please enter your last name.";
      document.getElementById("endorse_lname_break").innerHTML =
        "<p>" + errorMessageLastName + "</p>";
    }

    if (occupation === "") {
      let errorMessageOccupation = "Please enter your occupation.";
      document.getElementById("occupation_break").innerHTML =
        "<p>" + errorMessageOccupation + "</p>";
    }

    let upperCaseFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1);
    let upperCaseLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1);
    let upperCaseOccupation =
      occupation.charAt(0).toUpperCase() + occupation.slice(1);

    let newEndorsement = {
      name: upperCaseFirstName + " " + upperCaseLastName,
      occupation: upperCaseOccupation,
    };

    if (firstName != "" && lastName != "" && occupation != "") {
      $.post("/add-endorsement", newEndorsement).then(function(data) {
        console.log(data);
        alert(`Thank you for your endorsement!`);
        location.reload();
      });
    }
  });

  getEndorsementNames();

  function getEndorsementNames() {
    $.get("/endorsements").then(function(data) {
      console.log(data);
      let p = "<p>";
      for (var i = 0; i < data.length; i++) {
        let name = data[i].name;
        let occupation = data[i].occupation;

        $("#endorsement_names").append(name + ", " + occupation + " &#9670; ");
      }
    });
  }
});
