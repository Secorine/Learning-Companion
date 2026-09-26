
let task=window.today;
let index=0;
let done=0;
let mistakes=[];

function render(){
 document.getElementById("progress").textContent=done+"/"+task.questions.length;
 if(index>=task.questions.length){
 document.getElementById("main").innerHTML=
 "<div class='card'><h2>⭐ 今日任务完成</h2><p>获得一颗星星！</p></div>";
 return;
 }
 let q=task.questions[index];
 let html="<div class='card'><h2>"+q.question+"</h2>";
 q.options.forEach((x,i)=>{
 html+="<button class='option' onclick='answer("+i+")'>"+x+"</button>";
 });
 html+="</div>";
 document.getElementById("main").innerHTML=html;
}

function answer(i){
 let q=task.questions[index];
 let ok=i===q.answer;
 if(!ok) mistakes.push(q);
 document.getElementById("main").innerHTML+=
 "<div class='explain'>"+(ok?"✓ 正确":"✗ 错误")+"<br>"+q.explanation+"</div>";
 done++;
 setTimeout(()=>{index++;render();},1200);
}

document.getElementById("import").onchange=e=>{
 let file=e.target.files[0];
 let reader=new FileReader();
 reader.onload=()=>{
  task=JSON.parse(reader.result);
  index=0;done=0;
  render();
  alert("题库导入成功");
 };
 reader.readAsText(file);
};

render();

if("serviceWorker" in navigator){
 navigator.serviceWorker.register("sw.js");
}
