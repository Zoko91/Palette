//
//
// if (page != "palette" && page != "history") {
//     if (page == '') {
//         page = "main";
//
//         // Titre colors qui change de couleurs
//         let colors = document.querySelector('.text-colors');
//         sweep(colors, 'color', '#a8f', '#a8f', { direction: -1, duration: 100000 });
//
//         loop(colors);
//     }
//     let currentPage = document.getElementById(`${page}`);
//     currentPage.classList.add("active");
// }
//
//
//
//
//
// function loop(colors) {
//     sweep(colors, ['color'], '#df2f20', '#da255a', {
//         callback: loop,
//         direction: 1,
//         duration: 20000,
//         space: 'HSL'
//     });
// }
//
//
// // let color_dictionary = ['#F00', '#0F0', '#00F'];
// // let input = document.getElementById("input");
// // let i = 0;
// // let stringArray = '';
// // input.addEventListener("keypress", () => {
// //     // console.log(input.value.slice(-1));
// //     stringArray = input.value.split();
// //     stringArray.forEach(element => {
// //         input.value.innerText += `<span style="color:red">${element}</span>`;
// //     });
// //     input.style.caretColor = color_dictionary[i % 3];
// //     i++;
// // });
//
// var cards = document.getElementsByClassName("card-color");
// for (let card of cards) {
//     var backCopy = card.querySelector(".back-copy");
//
//     //console.log(backColor.innerHTML);
//
//     backCopy.addEventListener("click", (e) => {
//         card.classList.toggle("flipped");
//         var backColor = card.querySelector(".back-color").innerText;
//         var backCopyConfirm = card.querySelector(".back-copy-confirm");
//
//         if (navigator.clipboard) {
//             navigator.clipboard.writeText(backColor).then(() => {
//                 // alert('Copied to clipboard')
//                 backCopyConfirm.style.background = card.getAttribute("card-color");
//                 backCopyConfirm.classList.add("fade-in");
//                 backCopyConfirm.style.display = "block";
//                 setTimeout(() => {
//                     backCopyConfirm.classList.replace("fade-in", "fade-out");
//                     setTimeout(() => {
//                         backCopyConfirm.style.display = "none";
//                         backCopyConfirm.classList.remove("fade-out");
//                     }, 2000);
//                 }, 2000)
//                 return;
//             })
//         } else {
//             alert('Browser Not compatible with copy');
//         }
//     });
//
//     card.addEventListener("click", () => {
//         card.classList.toggle("flipped");
//     });
// }
