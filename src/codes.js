function generateBinaryCodes(n){
    let output=[]
    for(let i=0; i<n; i++){
        output.push(i.toString(2))
    }
    let len = output[output.length-1].length
    for(let i=0; i<n; i++){
        let element = output[i]
        for(let j=0; j<element.length; j++){
            if(element.length<len){
                element = "0".repeat(len-element.length) + element
                output[i]=element
            }
        }
    }
    return output
}

function generateGrayCodes(array){
    let output=[]
    for(let i=0; i<array.length; i++){
        let binary = array[i].split('')
        let gray = []
        gray[0]=binary[0]
        for(let j=1; j<binary.length; j++){
            gray[j]=(parseInt(binary[j])+parseInt(binary[j-1]))%2
        }
        output.push(gray.join(''))
    }
    return output
}

export default function getHeadings(n){
    return generateGrayCodes(generateBinaryCodes(n))
}