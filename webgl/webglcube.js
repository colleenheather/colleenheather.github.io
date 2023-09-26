const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl'); // this way only works for chrome and firefox
if (!gl) {
    throw new Error('WebGL not supported');
}

//
// vertexData = [...]
// create buffer
// load vertexData into buffer
// create vertex shader
// create fragment shader
// create program
// attach shaders to program
// enable vertex attributes
// draw

var points = [];
var colors = [];

var axis = 0;
var theta = [0, 0, 0];

//added

var thetaLoc;

colorCube();

gl.clearColor(1.0, 1.0 ,1.0, 1.0); //background color

gl.enable(gl.DEPTH_TEST);

// Load shaders with html source code and initialize attribute buffers
var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );

var colorBuffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, colorBuffer );
gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW ); 

var colorLocation = gl.getAttribLocation( program, "vColor" );
gl.vertexAttribPointer( colorLocation, 4, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( colorLocation );

var positionBuffer = gl.createBuffer();
gl.bindBuffer( gl.ARRAY_BUFFER, positionBuffer );
gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW ); 


var positionLocation = gl.getAttribLocation( program, "vPosition" );
gl.vertexAttribPointer( positionLocation, 4, gl.FLOAT, false, 0, 0 );
gl.enableVertexAttribArray( positionLocation );

thetaLoc = gl.getUniformLocation(program, "theta");

render();

function colorCube()
{
    quad( 1, 0, 3, 2 );             
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

// takes input the indicies of four vertices in outward-pointing order and adds data to two arrays
// store vertex positions and corresponding face colors in arrays
function quad(a, b, c, d)
{   // 8 vertices (for cube)
    // must generate 2 triangles for each face; 6 vertices
    var vertices = [
        // (x, y, z, vertex confirmation)
        vec4( -0.5, -0.5,  0.5, 1.0 ), //front 4                
        vec4( -0.5,  0.5,  0.5, 1.0 ),       
        vec4(  0.5,  0.5,  0.5, 1.0 ),      //2             //3
        vec4(  0.5, -0.5,  0.5, 1.0 ),

        vec4( -0.5, -0.5, -0.5, 1.0 ),            //0,0
        vec4( -0.5,  0.5, -0.5, 1.0 ),  //back 4    
        vec4(  0.5,  0.5, -0.5, 1.0 ),          
        vec4(  0.5, -0.5, -0.5, 1.0 )       //1             //4
    ];

    var vertexColors = [
        [ 0.0, 0.0, 0.0, 1.0 ],  // black
        [ 1.0, 0.0, 0.0, 1.0 ],  // red
        [ 1.0, 1.0, 0.0, 1.0 ],  // yellow
        [ 0.0, 1.0, 0.0, 1.0 ],  // green
        [ 0.0, 0.0, 1.0, 1.0 ],  // blue
        [ 1.0, 0.0, 1.0, 1.0 ],  // magenta
        [ 0.0, 1.0, 1.0, 1.0 ],  // cyan
        [ 1.0, 1.0, 1.0, 1.0 ]   // white 
    ];

    //create twotriangles from the quad indices
    //vertex color assigned by the index of the vertex

    //uses the first 3 vertices to specify one triangle, the first, third and fourth then second
    //6 vertices on each face; two triangles
    var indices = [ a, b, c, a, c, d ];

    for ( var i = 0; i < indices.length; ++i ) {
        points.push( vertices[indices[i]] );
        colors.push(vertexColors[a]); //fill face of two triangles/square 
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    //theta[axis] += 0.5;
    while(theta[0] < 10){
        theta[0] += 0.5; 
    }
    theta[1] += 0.5;
    gl.uniform3fv(thetaLoc, theta);
    gl.drawArrays( gl.TRIANGLES, 0, 36 ); //start at 0 to 36 (36 vertices to draw)
    requestAnimationFrame(render);  //don't need the browser support function from Angel
}