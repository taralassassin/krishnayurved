(function(){
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(CustomEase);

    document.addEventListener('DOMContentLoaded', function() {
    const panel2 = document.getElementById('panel2');

    // Create an intersection observer to trigger the animations once panel2 is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'panel2') {
            // Once panel2 is visible, add the 'animate' class to trigger animations
            panel2.classList.add('animate');
            observer.unobserve(entry.target); // Stop observing after the first animation
        }
        });
    }, {
        threshold: 0.3 // Trigger when 30% of panel2 is visible
    });

    // Start observing panel2
    observer.observe(panel2);
    });


    const PERSON = { delay: 0.48+0.1, duration: 1.2 };
    const FLAME  = { delay: 0.7+0.1, duration: 2 };
    const PETALS = { delay: 1.7, duration: 1.2  };
    const lowerPetalDelay = 0.2;
    const petalsopacitydelay = 0.8;

    function playAnimations(){
        const clipPerson = document.getElementById('clipRectPerson');
        const person     = document.getElementById('person');
        const flame      = document.getElementById('flame');
        const circle     = document.getElementById('circle');
        const petals     = ['petalLU','petalLL','petalRU','petalRL'].map(id=>document.getElementById(id));
        
        const tl = gsap.timeline();
        tl.fromTo("#circle", { y: "-80vh" }, { y: "0", ease: "power2.Out", duration: 1 });

        gsap.set(person, { opacity: 1 });
        gsap.set(circle, { opacity: 1 });
        gsap.set(petals, { opacity: 1 });
        
        gsap.set(clipPerson, { attr: { y: 500, height: 0 } });
        gsap.to(clipPerson, { attr: { height: 275 }, duration: PERSON.duration, ease: 'power2.Out', delay: PERSON.delay });
        gsap.set(flame, { opacity: 1 });

        gsap.to("#reveal_box", { y: -1000, duration: 1.6, ease: 'power3.Out', delay: 0.4 });

        gsap.from(["#petalLU", "#rect2L"], {
            x: 1,y: -15, rotation: 36,
            delay: PETALS.delay, 
            duration: PETALS.duration,
            transformOrigin: "100% 100%",
            ease: "power1.out"
        });
        gsap.from("#petalLL", {
            x: 5,y: -31, rotation: 66,
            delay: PETALS.delay, 
            duration: PETALS.duration+lowerPetalDelay,
            transformOrigin: "100% 100%",
            ease: "power1.out"
        });
        gsap.from(["#petalRU", "#rect2R"], {
            x: -1,y: -15, rotation: -36,
            delay: PETALS.delay, 
            duration: PETALS.duration,
            transformOrigin: "0% 100%",
            ease: "power1.out"
        });
        gsap.from("#petalRL", {
            x: -5,y: -31, rotation: -66,
            delay: PETALS.delay, 
            duration: PETALS.duration+lowerPetalDelay,
            transformOrigin: "0% 100%",
            ease: "power1.out"
        });

    }
    window.addEventListener('load', ()=> setTimeout(playAnimations, 200));
    

})();