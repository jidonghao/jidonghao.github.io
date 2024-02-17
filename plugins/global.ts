import Hljs from 'highlight.js'

export default defineNuxtPlugin(async NuxtApp => {
    // nuxtApp包含的属性可看文档 https://nuxt.com/docs/guide/going-further/internals

    NuxtApp.vueApp.directive('highlight', function (el: any) {
        const blocks = el.querySelectorAll('pre code')
        blocks.forEach((block: any) => {
            Hljs.highlightBlock(block)

            const ul = document.createElement('ul')
            block.innerHTML.split('\n').forEach((v:any,i:number)=>{
                const li = document.createElement('li')
                li.innerHTML =`<span>${ String(i+1)}</span>`
                li.classList.add('line')
                ul.appendChild(li)
            })
            ul.classList.add('line-numbers')

            block.innerHTML = `<ul><li>${block.innerHTML.replace(/\n/g, `</li><li class="line">`)}</li></ul>`;

            block.appendChild(ul)
        })
    })
})
