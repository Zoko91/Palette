
var path = window.location.pathname;
var page = path.split("/").pop();
// console.log(page);
if (page == '') {
    page = "main";
}
let currentPage = document.getElementById(`${page}`);
currentPage.classList.add("active");


let colors = document.querySelector('.text-colors');
sweep(colors, 'color', '#a8f', '#a8f', { direction: -1, duration: 100000 });

function loop() {
    sweep(colors, ['color'], '#df2f20', '#da255a', {
        callback: loop,
        direction: 1,
        duration: 20000,
        space: 'HSL'
    });
}
loop();

// let color_dictionary = ['#F00', '#0F0', '#00F'];
// let input = document.getElementById("input");
// let i = 0;
// let stringArray = '';
// input.addEventListener("keypress", () => {

//     // console.log(input.value.slice(-1));
//     stringArray = input.value.split();
//     stringArray.forEach(element => {
//         input.value.innerHTML += `<span style="color:${color_dictionary[i % 3]}">${element}</span>`;
//     });
//     input.style.caretColor = color_dictionary[i % 3];
//     i++;
// });

