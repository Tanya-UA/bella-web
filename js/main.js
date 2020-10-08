document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    /* for find mobile or pc */
    let agent = navigator.userAgent.match(/mobile|Android|ip(hone|od)|ipad|blackberry|Phone|Tablet/gim);
    let mobile, pc;
    
   //	---------------------NavBar---------------------------
   const navbarItem = document.querySelectorAll('.navbar__item'),
        navbar__openMenu__a = document.querySelectorAll('.openMenu__item');
    //-----------Fixed navBar---------
    const navbar = document.querySelector('.header__navbar'),
        headerCont = document.querySelector('.header');
    let header__size = headerCont.getBoundingClientRect();
    let header__sizeHeight;
    let navbar__sizeY;
    //	---------------------Nav Burger---------------------------
    const burgerNav__a = document.querySelectorAll('.burgerNav a'),
        burger = document.querySelector('.burger');

    //----------------- MENU Card-----
    const foodCard = document.querySelectorAll('.foodCard__item'),
        openMenu__bigContainer = document.querySelector('.foodMenu__bigContainer'),
        openMenu__closeBtn = document.querySelector('.foodMenu__close'),
        openMenu__nextArrow = document.querySelector('.arrow__right'),
        openMenu__prevArrow = document.querySelector('.arrow__left'),
        openMenu__allItems = document.querySelectorAll('.foodMenu__itemList');

    let arrMenuOpenList = [];
    let indexlist = 0;

    //-----------------OFFERS---------
    const offers = document.querySelectorAll('.offers__container'),
        offersBtn = document.querySelectorAll('.offersBtn');
    let i = 0;

    /* touches event */
        
    let touchesObj = {
        touchStartX: 1,
        touchStartY: 1,
        touchMoveX: 1,
        touchMoveY: 1,
        touchEndX: 1,
        touchEndY: 1,
        tab: false,
        swipeLeft: false,
        swipeRight: false,
        targetDataId: "",
        pageY: 1,
        pageYEnd: 1,
    }
    
    const sensitivity = 20;


    /*-------------------------- FUNCTION PART------------------------------ */

    //	---------------------NavBar---------------------------
    function toggleNavbar (event) {
        let target = event.target.classList.contains('navbar__item');
        let target_btn = event.target.classList.contains('navbar__btn');
    /*  let classEl = this.classList.contains('navbar__itemActive'); */
        for (let elem of navbarItem) {
            if (elem != event.target) {
                elem.classList.remove('navbar__itemActive');
            }
        }
        if (target_btn == true || target == true) {
            (this.classList.contains('navbar__itemActive') == false) ? this.classList.add('navbar__itemActive') : this.classList.remove('navbar__itemActive');   
        }   
    }





    //----------------- MENU Card  some Functions-----
    function closeFoodList() {
        openMenu__bigContainer.style.visibility = "hidden";
        for (let elem of arrMenuOpenList) {
            elem.style.visibility = "hidden";
        }
        arrMenuOpenList.length = 0;
        indexlist = 0;
        document.body.style.overflow = '';
    }

    function showRightItem(num) {
        if(num == 1 && indexlist < arrMenuOpenList.length && indexlist >= 0) {
            arrMenuOpenList[indexlist].style.visibility = 'hidden';
            ++indexlist;
            if (indexlist < arrMenuOpenList.length) {
                arrMenuOpenList[indexlist].style.visibility = 'visible'; 
            } else {
                indexlist = 0;
                arrMenuOpenList[indexlist].style.visibility = 'visible'; 
            }
                    
        } else if(num == (-1) && indexlist < arrMenuOpenList.length && indexlist >= 0) {
            arrMenuOpenList[indexlist].style.visibility = 'hidden';
            --indexlist;
            if(indexlist < 0) {
                indexlist = arrMenuOpenList.length - 1;
                arrMenuOpenList[indexlist].style.visibility = 'visible'; 
            } else {
                arrMenuOpenList[indexlist].style.visibility = 'visible'; 
            }
        }   
    }
    function openFoodMenu(trueItems) {
        let nameId = `div#${trueItems}`; 
        for (let elem of openMenu__allItems) {
            if (elem.matches(nameId)) {
                arrMenuOpenList.push(elem);  
            } else {
                false;
            }
        }
        openMenu__bigContainer.style.visibility = 'visible';
        arrMenuOpenList[0].style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        if (pc = true){
            openMenu__closeBtn.addEventListener('click', closeFoodList);
            openMenu__nextArrow.addEventListener('click', function() {
                showRightItem(1);
            });
            openMenu__prevArrow.addEventListener('click',function() {
                showRightItem(-1);
            });
        }
        
            
    }

    /* OFFERS FUNCTION */
    function showOffersSlide (id) {
        for(let elem of offers) {
            elem.style.opacity = 0;
        }
        if(id == 'offersBtn__left' && i >= 0 && i < offers.length) {
            i--;
            if(i < 0) {
                i = offers.length - 1;
                offers[i].style.opacity = 1; 
            } else {
                offers[i].style.opacity = 1; 
            }
        } else if (id == 'offersBtn__right' && i >= 0 && i < offers.length) {
            i++;
            if(i >= offers.length) {
                i = 0;
                offers[i].style.opacity = 1; 
            } else {
                offers[i].style.opacity = 1; 
            }
        }
    }


    /* Device Function  */
    function showDevice() {
        (agent != null) ? mobile = true : pc = true;
        startWork();
        console.log(mobile + '   ' + pc);
    }

    /* FUNCTION FOR MOBILE VERSION */
    function showStartTouches(event) {
    //		e.preventDefault();
        touchesObj.touchStartX = event.changedTouches[0].clientX;
        touchesObj.touchStartY = event.changedTouches[0].clientY;
        touchesObj.pageY = window.pageYOffset;
    }

    function showMoveTouches(event) {
        let touchMove = { 
            x: event.changedTouches[0].clientX, 
            y: event.changedTouches[0].clientY 
        };	
        touchesObj.touchMoveX = touchMove.x;
        touchesObj.touchMoveY = touchMove.y;	
    }
    
    function showEndTouches(event){
        let touchEnd = { 
            x: event.changedTouches[0].clientX, 
            y: event.changedTouches[0].clientY 
        };
        touchesObj.touchEndX = touchEnd.x;
        touchesObj.touchEndY = touchEnd.y;
        let d = {
            x: (touchesObj.touchStartX - touchesObj.touchEndX),
            y: (touchesObj.touchStartY - touchesObj.touchEndY),
            moveX: touchesObj.touchStartX - touchesObj.touchMoveX,
            moveY: touchesObj.touchStartY - touchesObj.touchMoveY,
            
        };
        if (Math.abs(d.x) <= sensitivity && Math.abs(d.y) <= sensitivity && touchesObj.pageY == touchesObj.pageYEnd) {
            
            touchesObj.tab = true;
           
            let eventClass = event.target.className;
            let eventDataId = event.target.dataset.id;
    
            touchesObj.targetDataId = eventDataId;

            if(eventClass == 'burger' || event.target.closest(".burger") == burger) {
                tabBurger();
                
            } else if(eventClass == "burgerNav__a") {
                burger.classList.remove('burger__active');
              

            } else if (eventClass == 'foodCard__img') {
                openFoodMenu(eventDataId); 
            } else if (eventClass == 'foodMenu__close') {
                closeFoodList();
            } else if (eventDataId == 'offersBtn__left' || eventDataId == 'offersBtn__right') {
                showOffersSlide(eventDataId);
            }
            
        } else if(d.moveX > 0 && Math.abs(d.moveX) > 50) {

            touchesObj.swipeLeft = true;
            if (event.target.closest('.foodMenu__itemList')) {
                showRightItem(1);
            }

            
        } else if(d.moveX < 0 && Math.abs(d.moveX) > 50) {

            touchesObj.swipeRight = true;
            if (event.target.closest('.foodMenu__itemList')) {
                showRightItem(-1);
            }
        }



    }

    function tabBurger() {
        console.log("burgerTab");
        burger.classList.toggle('burger__active');
    }



    //-----------Fixed navBar---------
    window.addEventListener('scroll', function() {
        touchesObj.pageYEnd = window.pageYOffset;
        header__sizeHeight = header__size.height;
        navbar__sizeY = window.pageYOffset;
        if (navbar__sizeY  > header__sizeHeight) {
            navbar.classList.add('header__fixedNavbar');
        } else if (navbar__sizeY < header__sizeHeight) {
            navbar.classList.remove('header__fixedNavbar');
        }
    });


    function startWork() {
        console.log(mobile + '   ' + pc);
        
        if (pc == true) {

        //	---------------------NavBar---------------------------
            navbarItem.forEach(function(el){
                el.addEventListener('click', toggleNavbar);
            }); 
            navbar__openMenu__a.forEach(function(el) {
                el.addEventListener('click', function(){
                    for (let elem of navbarItem) {
                        elem.classList.remove('navbar__itemActive');
                    }
                });
            });
        
        //	---------------------Nav Burger---------------------------
            
            burger.addEventListener('click', function() {
                burger.classList.toggle('burger__active');
                if (burger.classList.contains('burger__active') == true) {
                    burgerNav__a.forEach(function(el){
                        el.addEventListener('click', function(){
                            burger.classList.remove('burger__active');   
                        }); 
                    }); 
                }
            });
            //----------------- MENU Card-----
            
            foodCard.forEach(function(el){
                el.addEventListener('click', function(event){
                    let showIdList = event.target.dataset.id;
                    openFoodMenu(showIdList); 
                });
            });

            
            ///////////////////////////////////////////
        //-----------------OFFERS---------
            
            
            offersBtn.forEach(function(el) {
                el.addEventListener('click', (event) => {
                    let targetId = event.target.dataset.id;
                    showOffersSlide(targetId);
                });
            });
           

        } else if (mobile == true) {
            console.log('work');
            
            document.querySelector('.header__navbar').style.height = '5rem';
            document.querySelector('.navbar').style.display = 'none';
            document.querySelector('.header__navbar-logo').style.display = 'none';
            document.querySelector('.navbarBurger__container').style.display = 'block';

            document.querySelectorAll('.foodArrows').forEach((el) => {
                    el.style.display = 'none'; 
                }
            );
                
            
            document.addEventListener('touchstart', showStartTouches);
            document.addEventListener('touchmove', showMoveTouches);
            document.addEventListener('touchend', showEndTouches); 
        }  
    }
    
    showDevice();


});