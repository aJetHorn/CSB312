$(document).ready(function() {
   
    
});



function gen1(){
    
}




















function genStrat1(){
    var body=$("#tree");
    
    createUL(body);
    
        createLI(body);
            createUL(body);
                createLI(body);
                createLI(body);
    
    
}


function createLI(parent,nodeName,nodeAlloc){
    var str="";
    str+="<li id='";
    str+=nodeName+"'>";
    str+= createNODE(parent,nodeName,nodeAlloc);
    str+="</li>";
    
    parent.find('ul').append(str);
    
    
    
}

// unordered list
function createUL(parent){
    parent.append("<ul></ul>");
}


function createNODE(parent, nodeName, nodeAlloc){
    var str="";
    str+="<a href='#' class='node'>";
    
    str+="<div class='name'>"+nodeName+"</div>";
    
    str+="<div class='allocation' style='display: none;'>";
 
    str+=nodeAlloc+"</div>"; // end
    
    return str;
}
/*
<!-- Tree -->
            
            <div class="tree" id="tree">
                <ul>
                    <li id="Strategy">
                        
                            <a href="#" class="node">
                                <div class="name">Portfolio</div>
                                <div class="allocation" style='display: none;'>10</div>
                                <div class="percent" style='display:none;'>%</div>
                            </a>
                        
                        <ul>
                            <li id="Equity">
                                <a href="#">Equity</a>
                                <ul>
                                    <li>
                                        <a href="#">Grand Child</a>
                                    </li>
                                    <li>
                                        <a href="#">Grand Child</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">Stocks</a>
                                <ul>
                                    <li><a href="#">Grand Child</a></li>
                                    <li>
                                        <a href="#">Grand Child</a>
                                        <ul>
                                            <li>
                                                <a href="#">Great Grand Child</a>
                                            </li>
                                            <li>
                                                <a href="#">Great Grand Child</a>
                                            </li>
                                            <li>
                                                <a href="#">Great Grand Child</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><a href="#">Grand Child</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>


            <!-- END OF TREE -->
            */