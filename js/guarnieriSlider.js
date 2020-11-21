// guarnieriSlider - v0.1

function GuarnieriSlider(params){

    const autoPlay = params.autoPlay;
    const blockButton = params.blockButton;
    const interval = params.interval;
    const transition = params.transition;
    const btnForward = document.getElementById("btnForward");
    const btnPrevious = document.getElementById("btnPrevious");
    const guarnieriSlider = document.querySelector(".guarnieri-slider");
    guarnieriSlider.style.width = params.width;
    guarnieriSlider.style.height = params.height;

    const slides = document.querySelectorAll(".guarnieri-slider .slides .slide");
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
   
    slides.forEach(slide => {
        slide.style.transition = (transition/1000)+"s transform ease";
    });

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
            slides.forEach(function(slide, index){
                if(index == 0){
                    slide.classList.remove("right");
                    slide.classList.remove("left");
                    slide.classList.add("active");
                }else{
                    slide.classList.remove("active");
                    slide.classList.remove("left");
                    slide.classList.add("right");
                }
            });
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
    setTimeout(avancar, interval);
    function avancar(){
        if(!paused && autoPlay){
            btnForward.click();
        }
        setTimeout(avancar, interval);
    }
}