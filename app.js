let task = window.today;
let index = 0;
let done = 0;
let mistakes = [];
let locked = false;

function render(){

    document.getElementById("progress").textContent =
        done + "/" + task.questions.length;

    if(index >= task.questions.length){

        document.getElementById("main").innerHTML =
        `
        <div class="card">
            <h2>⭐ 今日任务完成！</h2>
            <p>完成：${done}/${task.questions.length}</p>
            <p>今天也坚持学习了呢！</p>
        </div>
        `;

        return;
    }


    let q = task.questions[index];

    let html =
    `
    <div class="card">
        <h2>${index+1}. ${q.question}</h2>
    `;


    q.options.forEach((x,i)=>{

        html +=
        `
        <button class="option"
        onclick="answer(${i})">
        ${x}
        </button>
        `;

    });


    html += "</div>";


    document.getElementById("main").innerHTML = html;
}



function answer(i){

    if(locked)return;

    locked=true;

    let q = task.questions[index];

    let correct = i === q.answer;


    if(!correct){
        mistakes.push(q);
    }


    document.getElementById("main").innerHTML +=
    `
    <div class="explain">
        <h3>
        ${correct ? "✓ 回答正确" : "✗ 回答错误"}
        </h3>

        <p>
        ${q.explanation}
        </p>


        <button onclick="nextQuestion()">
        下一题
        </button>

    </div>
    `;

}



function nextQuestion(){

    done++;

    index++;

    locked=false;

    render();

}



render();
