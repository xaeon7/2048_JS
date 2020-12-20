const touchstartX = 0;
const touchstartY = 0;
const touchendX = 0;
const touchendY = 0;



this.addEventListener('touchstart', function(event) {
    touchstartX = e.changedTouches[0].screenX;
    touchstartY = e.changedTouches[0].screenY;
}, false);

this.addEventListener('touchend', function(event) {
    touchendX = event.screenX;
    touchendY = event.screenY;
    handleGesure();
}, false); 

function handleGesure() {
    const swiped = 'swiped: ';
    if (touchendX < touchstartX) {
        alert(swiped + 'left!');
    }
    if (touchendX > touchstartX) {
        alert(swiped + 'right!');
    }
    if (touchendY < touchstartY) {
        alert(swiped + 'down!');
    }
    if (touchendY > touchstartY) {
        alert(swiped + 'up!');
    }
}