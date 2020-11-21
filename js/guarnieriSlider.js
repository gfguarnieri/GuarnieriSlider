// guarnieriSlider - v0.2

function GuarnieriSlider(params){

    const autoPlay = params.autoPlay;
    const blockButton = params.blockButton;
    const interval = params.interval;
    const transition = params.transition;
    const btnForward = document.getElementById("btnForward");
    const btnPrevious = document.getElementById("btnPrevious");
    const guarnieriSlider = document.querySelector(".guarnieri-slider");

    const propor = params.aspect;

    if(propor!=0){
        let images = document.querySelectorAll(".guarnieri-slider .slides .slide img");
        images.forEach(el => {
            el.style.objectFit = "contain";
        })
    }

    const width = params.width;
    const height = params.height;

    function adjustSize(){
        if(propor!=0){
            //let w = window.innerWidth * (width/100);
            guarnieriSlider.style.width = width + "%";
            guarnieriSlider.style.height = guarnieriSlider.offsetWidth/propor+"px";
        }else{
            guarnieriSlider.style.width = width;
            guarnieriSlider.style.height = height;
        }
    }

    const slides = document.querySelectorAll(".guarnieri-slider .slides .slide");

    adjustSize();

    function startSlider(){
        slides.forEach(function(el, index){
            if(index>0){
                el.classList.add("right");
            }
        });
    }

    startSlider();

    var current = 0;
    var currentSlide;

    if(blockButton){
        btnPrevious.classList.add("disabled-button");
        if(slides.length == 1){
            btnForward.classList.add("disabled-button");
            btnForward.style.visibility = "hidden";
            btnPrevious.style.visibility = "hidden";
        }
    }

    var paused = false;

    //Pause Slider
    guarnieriSlider.addEventListener("mouseover", function(){
        paused = true;
    });
    guarnieriSlider.addEventListener("mouseleave", function(){
        paused = false;
    });
   
    function removeAnimation(less){
        slides.forEach(function(slide, index){
            if(index!=less){
                slide.removeAttribute("style");
                slide.removeAttribute("style");
            }
        });
    }

    function addAnimation(){
        slides.forEach(slide => {
            slide.style.transition = (transition/1000)+"s transform ease";
        });
    }

    addAnimation();

    //Forward Button Click
    btnForward.addEventListener("click", function(){
        btnPrevious.classList.remove("disabled-button");
        slides.forEach(function(slide, index){
            if(slide.classList.contains("active")){
                current = index;
                currentSlide = slide;
            }
        });
        //Last
        if(current == slides.length-1){
            removeAnimation(current);
            slides.forEach(function(slide, index){
                if(index == 0){
                    slide.classList.remove("left");
                    slide.classList.remove("right");
                    slide.classList.add("active");
                }
                else if(index == current){
                    slide.classList.add("right");
                    slide.classList.remove("active");
                }
                else{
                    slide.classList.remove("active");
                    slide.classList.remove("left");
                    slide.classList.add("right");
                }

            });
            setInterval(addAnimation, transition/1000);
        }else{
            currentSlide.classList.remove("active");
            currentSlide.classList.add("left");
            slides.item(current+1 % slides.length).classList.add("active");
            slides.item(current+1 % slides.length).classList.remove("right");
            if(current+1 % slides.length == slides.length-1 && blockButton){
                btnForward.classList.add("disabled-button");
                btnPrevious.classList.remove("disabled-button");
            }
        }
    });

    //Previous Button Click
    btnPrevious.addEventListener("click", function(){
        btnForward.classList.remove("disabled-button");
        slides.forEach(function(slide, index){
            if(slide.classList.contains("active")){
                current = index;
                currentSlide = slide;
            }
        });
        //first
        if(current == 0){
            //removeAnimation(slides.length-1);
            slides.forEach(function(slide, index){
                if(index == slides.length-1){
                    slide.classList.remove("left");
                    slide.classList.remove("right");
                    slide.classList.add("active");
                }else{
                    slide.classList.remove("active");
                    slide.classList.remove("right");
                    slide.classList.add("left");
                }
            });
            setInterval(addAnimation, transition/1000);
        }else{
            currentSlide.classList.remove("active");
            currentSlide.classList.add("right");
            slides.item(current-1 % slides.length).classList.add("active");
            slides.item(current-1 % slides.length).classList.remove("left");
            if(current-1 % slides.length == 0 && blockButton){
                btnPrevious.classList.add("disabled-button");
                btnForward.classList.remove("disabled-button");
            }
        }
    });
    setTimeout(next, interval);
    function next(){
        if(!paused && autoPlay){
            if(!btnForward.classList.contains("disabled-button"))
                btnForward.click();
        }
        setTimeout(next, interval);
    }


    window.addEventListener('resize', function(event){
        adjustSize();
    });


    window.addEventListener("orientationchange", function() {
        adjustSize();
    });


}