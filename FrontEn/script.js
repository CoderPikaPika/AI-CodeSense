async function  takedata(){
    const data=document.getElementById("input").value;
    const res= await fetch( "/post" ,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
    });
}
