var salutation = "hello, ";

function greetme(user) {
    self.port.emit("check_chrome_bits", "blah blah");
    window.alert(salutation + user);
}


 
exportFunction(greetme, unsafeWindow, {defineAs: "greetme"});
