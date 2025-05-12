function carregarConteudo(){
    //consultar e exibir o conteudo de GET /inventarios
    $.ajax({
        url: "http://localhost:3000/inventarios",
        type: "GET",
        dataType: "json",
        success: function(dados){
            $("#carregando").hide();
            dados.forEach(function(item){
                $("#caixa_conteudo").append(`
                    <div class='cartoes'>
                        <b> Nº <span id='codigo'>${item.codigo}</span> </b> <br>
                        Descrição: <span id='descricao'>${item.descricao}</span><br>
                        Setor: <span id='setor'>${item.setor}</span><br>
                        Categoria: <span id='categoria'>${item.categoria} </span>
                    </div>
                `)
            })
        },
        error: function(){
            alert("Erro ao acessar GET/inventarios")
        }
    }) // Fecha o ajax
}//Fim da função

//O DocumentReady executa o código quando a página for aberta
$(document).ready(function(){
    carregarConteudo();
    $("#tela_escura").hide();
    $("#formulario_cadastro").hide();
    $("#formulario_editar").hide();
})

$("#btn_fechar_form_cad").click(function(){
    $("#tela_escura").hide();
});

$("#btn_cadastrar").click(function(){
    var codigo = $("#caixa_codigo").val();
    var descricao = $("#caixa_descricao").val();
    var setor = $("#caixa_setor").val();
    var categoria = $("#caixa_categoria").val();
    

    //Cadastrar itens POST /inventarios
    $.ajax({
        url: "http://localhost:3000/inventarios",
        type: "POST",
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify({codigo, descricao, setor, categoria}),
        success: function(resposta){
            alert(resposta.msg);
            $("#caixa_conteudo").html("");
            $("#carregando").show();
            $("#tela_escura").hide();
            $("#formulario_cadastro").hide();
            carregarConteudo();
        },
        error: function(){
            alert("Falha ao acessar POST /inventarios")
        }
    })
})//Fim do click no btn_cadastrar


$("#btn_mais").click(function(){
    $("#tela_escura").show();
    $("#formulario_cadastro").show();
    $("#formulario_editar").hide();
})

$("#btn_pesquisar").click(function(){
    $("#caixa_conteudo").html("");
    $("#carregando").show();
    var codigo = $("#caixa_pesquisa").val();
    if(codigo == ""){ 
        alert("Digite algo para pesquisar");
    }
    $.ajax({
        url: "http://localhost:3000/inventarios/"+codigo,
        type: "GET",
        dataType: "json",
        success: function(dados){
            $("#carregando").hide()
            if(dados.length >=1){
                    dados.forEach(function(item){
                    $("#caixa_conteudo").append(`
                        <div class='cartoes'>
                            <b> Nº <span id='codigo'>${item.codigo}</span> </b> <br>
                            Descrição: <span id='descricao'>${item.descricao}</span><br>
                            Setor: <span id='setor'>${item.setor}</span><br>
                            Categoria: <span id='categoria'>${item.categoria} </span>
                        </div>
                      `)
                    })
            }else{
                $("#caixa_conteudo").html("<h2> Nada encontrado 🫤</h2>")
            }
        },
        error: function(){
            alert("Falha ao acessar GET/ inventarios/:codigo")
        }
    })

})//Fim do click no btn_pesquisar

$(document).on("click",".cartoes",function(){
    $("#tela_escura").show();
    $("#formulario_editar").show();
})

$("#btn_fechar_form_editar").click(function(){
    $("#tela_escura").hide();
    $("#formulario_editar").hide();
})

