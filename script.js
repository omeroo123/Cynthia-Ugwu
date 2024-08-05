const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnime(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y : -10,
        opacity : 0,
        duration : 1 ,
        ease : Expo.easInOut
    })

    
    tl.to(".boundingelem",{
        y : '0',
        ease : Expo.easInOut,
        duration : 2,
        stagger : .2
    })

    tl.from("#hero-footer",{
        y : -10,
        opacity : 0,
        duration : 1 ,
        delay : - 0.99,
        ease : Expo.easInOut
    })

}


function mouseChipta(){
    var timeout = 0 ; 

    var xscale = 1
    var yscale = 1

    var xprev = 0
    var yprev = 0

    window.addEventListener("mousemove", function(dets){

        clearTimeout(timeout);
        
        var xdif = dets.clientX - xprev
        var ydif = dets.clientY - yprev
        
        xscale = gsap.utils.clamp(.8, 1.2 , xdif)
        yscale = gsap.utils.clamp(.8, 1.2, ydif)

        xprev = dets.clientX
        yprev = dets.clientY

        mouseMovementFollower( xscale, yscale )

        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        },100 );

    })
}

function mouseMovementFollower( xscale, yscale ) {
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
        });
}

document.querySelectorAll(".elem").forEach(function (elem){
    var rotate = 0 ;
    var diffrot = 0 ;
    elem.addEventListener("mouseleave", function(dets){
            gsap.to(elem.querySelector("img"),{
                opacity : 0,
                ease : Power3,
                duration : 0.5
            })
      

    });
    elem.addEventListener("mousemove", function(dets){
        var diffImg = dets.clientY - elem.getBoundingClientRect().top;

        diffrot = dets.clientX - rotate ;
        rotate = dets.clientX ;

            gsap.to(elem.querySelector("img"),{
                opacity : 1,
                ease : Power3,
                top : "diffImg",
                left : dets.clientX,
                rotate : gsap.utils.clamp(-20,20, diffrot*.5)

            })
      

    });
    });

    function updateTime() {
        
        const currentTime = new Date().toLocaleTimeString('en-US',{timeStyle : "short"});
        
        const timeElem = document.getElementById("timeLive");
        timeElem.textContent = currentTime ;
        
    }

    updateTime();
    setInterval( updateTime, 1000 );

mouseChipta();
mouseMovementFollower();
firstPageAnime();

