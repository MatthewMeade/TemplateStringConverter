const inputBox = document.querySelector("#input");
const outputBox = document.querySelector("#output");
const button = document.querySelector("#submit");

// Temp for dev
inputBox.value = "This is ${a + b} an example ${templateString}";

function convert(e){
  e.preventDefault();
  let input = inputBox.value;
  let parts = [];

  let firstIndex = input.indexOf("${");
  while (firstIndex >= 0){
    parts.push({
      value: input.slice(0, firstIndex),
      literal: true
    });
    input = input.slice(firstIndex + 2);

    let closingBracket = input.indexOf("}");
    if(closingBracket < 0) closingBracket = input.length;
    parts.push({
      value: input.slice(0, closingBracket),
      literal: false
    })
    input = input.slice(closingBracket + 1);

    firstIndex = input.indexOf("${");
  }

  let outputArr = [];
  parts.forEach(part => {
    if(part.literal) outputArr.push(`"${part.value}"`)
    else outputArr.push(`(${part.value})`)
  });
  if(input.length > 0)outputArr.push(`"${input}"`);

  outputBox.value = outputArr.join(" + ");



}

input.addEventListener("keyup", convert);
