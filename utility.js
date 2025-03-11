let result='';
let expression="";
let temp=0;
const error="Error";
function display(){    
         document.querySelector('.result').textContent=expression;
         console.log("display");

}
document.querySelectorAll('.btn-col').forEach(btn=>{
    btn.addEventListener('click',function(){
        const text=this.value;
          btnhandler(text);
    
    })
}
);

function btnhandler(val){
   if(val==='c'){
    expression='';
   }
   else if(val==='='){
    try{
         temp=evaluate(expression)
         result=temp;
         expression=String(temp);
    }
    catch(error){
       expression=error;
    }
   }
   else if(val==='backspace'){
     if(expression.length===1 || expression===error){
          expression='0';
     }
     else{
        expression=expression.slice(0,-1);
     }
   }
   else if(val==='pi'){
      if(expression==='0'){
        expression='Math.PI'
      }
      else{
        expression+='Math.PI';
      }
   } 
   else if(val==='e'){
    if(expression==='0'){
      expression='Math.E'
    }
    else{
      expression+='Math.E';
    }
    }
    else if(val==='square'){
        if(expression==='0'){
          expression='0'
        }
        else{
          try{
            temp=Math.pow(evaluate(expression),2);
            expression=String(temp);
          }
          catch(error){
            expression=error;
          }
        }
    }
   
    else if(val==='squarerrot'){
        if(expression==='0'){
          expression='√(';
        }
        else{
            expression+='√(';  
        }
    }
    else if(val==='inverse'){
        if(expression==='0'){
          expression=error;
        }
        else{
            try{
                temp=1/evaluate(expression);
                expression=String(temp);
            }
            catch(error){
               expression=error;
            }  
        }
    }
    else if(val==='abs'){
        expression=`|${expression}|`;
    }
    else if(val==='factorial'){
        try{
                temp=evaluate(expression);
                if(temp < 0 || !Number.isInteger(temp)){
                    expression="Error";
                }
                else{
                    let fac=1;
                    for(let i=2;i<=temp;i++){
                        fac=fac*i;
                    }
                    expression=String(fac);
                }
        }
        catch(error){
               expression='Error';
        }  
    }
    else if(val==='log'){
        if(expression==='0'){
            expression='log(';
        }
        else{
            expression+='log(';
        }
    }
    else if(val==='ln'){
        if(expression==='0'){
            expression='ln(';
        }
        else{
            expression+='ln(';
        }
    }
    else if(val==='10x'){
        try{
            const temp=Math.pow(10,evaluate(expression));
            expression=String(temp);
    }
    catch(error){
           expression='Error';
    }  
    }
     
    else if(val==='xy'){
        expression+='^';
    }
    else if(val==='+'){
        expression+='+';
    }
    else if(val==='-'){
        expression+='-';
    }
    else if(val==='*'){
        expression+='*';
    }
    else if(val==='divide'){
        expression+='/';
    }
    else if(val==='mod'){
        expression+='mod';
    }
    else if(val==='sin'){
        expression+='Math.sin(';
    }
    else if(val==='cos'){
        expression+='Math.cos(';
    }
    else if(val==='tan'){
        expression+='Math.tan(';
    }
    else if(val==='abs'){
        expression+='Math.abs(';
    }
    else if(val==='ceil'){
        expression+='Math.ceil(';
    }
    else if(val==='floor'){
        expression+='Math.floor(';
    }
    else{
        if(expression==='0' || expression==="Error"){
            expression=val;
        }
        else{
            expression+=val;
        }
    }
    console.log(expression)
    display();
}
display();
function evaluate(expr){
    try{
      let temp=expr
    
      
     
      
      .replace(/sin\(/g,'Math.sin(')
      .replace(/cos\(/g,'Math.cos(')
      .replace(/tan\(/g,'Math.tan(')
      .replace(/log\(/g,'Math.log10(')
      .replace(/ln\(/g,'Math.log(')
      .replace(/√\(/g,'Math.sqrt(');
      
      
      return eval(temp);
    }
    catch(error){
        return "Error";
    }
}
document.addEventListener('keydown', function(event) {
  const key = event.key;
  
  if (/[0-9]/.test(key)) {
     btnhandler(key);
  } else if (key === '+' || key === '-' || key === '.' || key === '(' || key === ')') {
    btnhandler(key);
  } else if (key === '*') {
    btnhandler('×');
  } else if (key === '/') {
    btnhandler('÷');
  } else if (key === 'Enter' || key === '=') {
    btnhandler('=');
  } else if (key === 'Backspace') {
    btnhandler('⌫');
  } else if (key === 'Escape') {
    btnhandler('C');
  } else if (key === '^') {
    btnhandler('xʸ');
  }
  
});
