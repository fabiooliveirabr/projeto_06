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
                        <b> Nº ${item.codigo} </b> <br>
                        Descrição: ${item.descricao} <br>
                        Setor: ${item.setor} <br>
                        Categoria: ${item.categoria}
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
