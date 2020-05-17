
var btn1 = document.getElementById("btn1")
var btn2 = document.getElementById("btn2")
var waitdiv = document.getElementById("wait")

btn1.style.display = 'none';
btn2.style.display = 'none';

const c1 = document.getElementById('c');
ctx1 = c1.getContext('2d');



const c3 = document.getElementById('c3');
const ctx3 = c3.getContext('2d');

let d1 = null;
let d2 = null;
let arr = new Array();
setTimeout(() => {

    let ct = 0;
    for (let i = 0; i < 400; i += 40) {

        for (let j = 0; j < 400; j += 40) {

            d1 = ctx1.getImageData(i, j, 40, 40);
            arr.push({
                'p': ct++,
                'i': i,
                'j': j,
                'data': d1
            })

            ctx3.putImageData(d1, i, j);
        }

    }

    console.log(arr.length);
    random();//sort descending
    btn1.style.display = 'block';
    btn2.style.display = 'block';
    waitdiv.style.display = 'none';

}, 1000);

let temp = null;
let loopCount = 0;

var exitLoop = false;

const swapAsc = async () => {
    btn1.disabled = true;
    if (exitLoop){ return; }

    let i = 0;
   
     waitI = async() => {
        if (exitLoop){ return; }
        setTimeout(async() => {
            if (exitLoop){ return; }
            if ( i < arr.length ) {
                let j=0;
                    waitJ = async() => {
                        setTimeout(async() => {
                            if (exitLoop){ return; }
                            if ( j < arr.length - 1 ) {
                                if (arr[j].p > arr[j + 1].p) {

                                    temp = arr[j].data;
                                    arr[j].data = arr[j + 1].data;
                                    arr[j + 1].data = temp;
                    
                                    temp = arr[j].p;
                                    arr[j].p = arr[j + 1].p;
                                    arr[j + 1].p = temp;
                    
                                    await ctx3.putImageData(arr[j].data, arr[j].i, arr[j].j);
                                    await ctx3.putImageData(arr[j + 1].data, arr[j + 1].i, arr[j + 1].j);
                                }
                                
                                j++;
                                
                                    waitJ();
                            }
                        }, 50);
                    }
                    if (exitLoop){ return; }
                    waitJ();

                    
                i++;
                if (exitLoop){ return; }
                waitI();
            }
        }, 100);
    }

    waitI();
    setTimeout(() => {
       if (loopCount < 6) {        
           swapAsc();
           loopCount++;        
           console.log('here');
       }else{// last loop
        btn1.disabled = false;
        sortImmediate()
            if(exitLoop){
                exitLoop = false;
                return;
            }
       }
        
    }, loopCount==0 ? 1400 : 2000);
    if (exitLoop){ return; }
    
}

const sortImmediate = () => {
      for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - 1; j++) {


            if (arr[j].p > arr[j + 1].p) {

                temp = arr[j].data;
                arr[j].data = arr[j + 1].data;
                arr[j + 1].data = temp;

                temp = arr[j].p;
                arr[j].p = arr[j + 1].p;
                arr[j + 1].p = temp;

                ctx3.putImageData(arr[j].data, arr[j].i, arr[j].j);
                ctx3.putImageData(arr[j + 1].data, arr[j + 1].i, arr[j + 1].j);
            }

        }

    }
}




const random = () => {

    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - 1; j++) {


            if (arr[j].p < arr[j + 1].p) {

                temp = arr[j].data;
                arr[j].data = arr[j + 1].data;
                arr[j + 1].data = temp;

                temp = arr[j].p;
                arr[j].p = arr[j + 1].p;
                arr[j + 1].p = temp;


                ctx3.putImageData(arr[j].data, arr[j].i, arr[j].j);
                ctx3.putImageData(arr[j + 1].data, arr[j + 1].i, arr[j + 1].j);
            }

        }

    }

}

const swapDec = () => {
    exitLoop = true;
    btn1.disabled = true;
    random();
    setTimeout(()=>{
        exitLoop = false;
        btn1.disabled = false;
        loopCount = 0;
    },1200)
}