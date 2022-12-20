

let colors = document.querySelector('.text-colors');
sweep(colors, 'color', '#a8f', '#a8f', { direction: -1, duration: 100000 });
console.log('test');

function loop() {
    sweep(colors, ['color'], '#df2f20', '#da255a', {
        callback: loop,
        direction: 1,
        duration: 20000,
        space: 'HSL'
    });
}
loop();