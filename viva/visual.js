(function(global){'use strict';
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const line=(a,b,c,d,w=9,color='#343240')=>'<path d="M'+a+' '+b+'L'+c+' '+d+'" fill="none" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>';
const path=(d,w=9,color='#343240')=>'<path d="'+d+'" fill="none" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round"/>';
const dot=(x,y,r,color)=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+color+'"/>';
const joint=(x,y)=>dot(x,y,5,'#f0a77c');
const head=(x,y)=>dot(x,y,11,'#f5b48c')+'<path d="M'+(x-10)+' '+(y-4)+'Q'+(x-2)+' '+(y-16)+' '+(x+10)+' '+(y-3)+'" fill="none" stroke="#343240" stroke-width="5" stroke-linecap="round"/>',
arm=(coords)=>path(coords,8,'#f0a77c'),leg=(coords)=>path(coords,11,'#373849');
const shirt=(d)=>'<path d="'+d+'" fill="#6dd5c5" stroke="#295e5f" stroke-width="1.5" stroke-linejoin="round"/>';
const ground='<path d="M11 111H109" stroke="#eedccf" stroke-width="3" stroke-linecap="round"/>';
const shoe=(x,y)=>'<ellipse cx="'+x+'" cy="'+y+'" rx="9" ry="4" fill="#fb7447"/>';
function pose(name){
 const n=String(name||'').toLocaleLowerCase('pt-BR');
 if(/descans|pausa|respira/.test(n))return 'rest';
 if(/corda/.test(n))return 'rope';
 if(/skipping|corrida|joelho|marcha|passo|laterai|toque|boxe/.test(n))return 'run';
 if(/agach|sumô/.test(n))return 'squat';
 if(/passada|avanço/.test(n))return 'lunge';
 if(/ponte|eleva.*quadril|abdução|clam/.test(n))return 'bridge';
 if(/remada|bíceps|rosca|tríceps|elástico|pressão|elevação lateral/.test(n))return 'band';
 if(/prancha|escalador|flexão/.test(n))return 'plank';
 if(/dead bug|abdominal|abdômen|bird dog|extensão de costas/.test(n))return 'core';
 if(/along|panturrilha|quadríceps|posterior|mobilidade|círculo/.test(n))return 'stretch';
 return 'stand';
}
const poses={
 stand:()=>shirt('M49 44Q60 41 71 44L74 76L46 76Z')+head(60,28)+arm('M48 50L34 70L23 78')+arm('M72 50L87 68L96 73')+leg('M51 77L49 96L43 106')+leg('M67 77L72 96L78 106')+shoe(42,107)+shoe(79,107),
 run:()=>'<g class="viva-sway">'+shirt('M49 42L71 43L74 76L50 76Z')+head(60,27)+arm('M50 51L37 58L28 47')+arm('M72 51L86 42L93 52')+leg('M54 75L47 89L29 89')+leg('M67 75L80 88L79 106')+shoe(27,90)+shoe(81,108)+'</g><path d="M13 83l8 -4m5 -2 5 -2" stroke="#ffc264" stroke-width="3" stroke-linecap="round"/>',
 rope:()=>'<g class="viva-sway">'+shirt('M49 44Q62 40 72 45L74 75L48 75Z')+head(61,28)+arm('M50 54L33 62L25 55')+arm('M73 54L88 62L95 55')+leg('M53 75L46 97L44 103')+leg('M70 75L76 97L78 103')+shoe(44,104)+shoe(78,104)+'</g><path d="M24 56C2 120 116 120 97 56" fill="none" stroke="#ffa94f" stroke-width="3" stroke-dasharray="6 4" stroke-linecap="round"/>',
 squat:()=>'<g class="viva-sway">'+shirt('M51 49L70 48L82 75L61 83Z')+head(54,35)+arm('M52 54L38 66L28 63')+arm('M71 54L86 64L96 60')+leg('M68 82L90 88L85 103')+leg('M64 83L40 91L32 104')+shoe(29,106)+shoe(88,105)+'</g>',
 lunge:()=>'<g class="viva-sway">'+shirt('M46 44L66 44L72 76L49 78Z')+head(55,29)+arm('M49 52L37 70L30 66')+arm('M67 52L81 66L89 61')+leg('M56 78L78 87L85 106')+leg('M65 78L42 96L22 106')+shoe(22,107)+shoe(86,107)+'</g>',
 band:()=>'<path d="M52 103Q60 71 44 56M72 104Q60 73 79 53" fill="none" stroke="#f5a23c" stroke-width="4"/>'+shirt('M47 43Q60 40 72 43L75 76L45 76Z')+head(59,29)+arm('M48 51L36 58L44 63')+arm('M72 51L85 58L78 63')+joint(44,63)+joint(78,63)+leg('M52 77L48 97L47 105')+leg('M68 77L73 96L75 105')+shoe(47,106)+shoe(75,106)+'<path d="M42 65Q60 56 80 65" fill="none" stroke="#ffa94f" stroke-width="3"/>',
 plank:()=>'<g class="viva-sway">'+shirt('M47 60L78 63L83 71L49 70Z')+head(34,58)+arm('M50 70L49 92L40 102')+arm('M61 70L64 93L72 102')+leg('M81 69L99 80L103 100')+leg('M79 73L90 85L94 102')+shoe(94,104)+shoe(103,103)+'</g>',
 bridge:()=>'<g class="viva-sway">'+head(29,87)+shirt('M43 82Q61 67 77 66L81 76L52 90Z')+arm('M48 86L42 103L35 103')+leg('M80 69L96 86L93 104')+leg('M76 74L81 94L75 103')+shoe(77,104)+shoe(93,105)+'</g>',
 core:()=>'<g class="viva-sway">'+shirt('M43 76L69 72L74 81L49 90Z')+head(30,81)+arm('M47 81L55 101L48 106')+arm('M53 80L64 96L60 104')+leg('M73 78L89 61L103 75')+leg('M68 78L85 92L98 91')+shoe(105,75)+shoe(101,93)+'</g>',
 stretch:()=>'<g class="viva-sway">'+shirt('M48 46L72 46L73 78L48 78Z')+head(60,32)+arm('M50 48L38 28L40 13')+arm('M70 49L84 27L84 14')+leg('M52 78L50 99L44 107')+leg('M68 78L73 99L80 106')+shoe(43,108)+shoe(80,108)+'</g>',
 rest:()=>'<g class="viva-sway">'+shirt('M48 47L73 47L74 78L48 78Z')+head(61,31)+arm('M49 53L37 71L32 81')+arm('M73 53L85 71L91 82')+leg('M53 78L49 98L42 107')+leg('M68 78L73 99L81 107')+shoe(40,107)+shoe(82,107)+'</g><path d="M90 19Q96 10 104 16" fill="none" stroke="#a5dcc7" stroke-width="3"/>'
};
function exercise(name,size='small'){
 const type=pose(name),scene=poses[type]();
 const bg=type==='rest'?'#e8f8ed':type==='stretch'?'#f1ebff':type==='band'?'#fff0df':'#fff2e4';
 return '<svg class="viva-exercise-art '+(size==='large'?'large':'small')+'" viewBox="0 0 120 116" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustração ilustrativa: '+esc(name)+'"><rect width="120" height="116" rx="19" fill="'+bg+'"/><circle cx="100" cy="17" r="15" fill="#ffffff" opacity=".52"/><circle cx="20" cy="25" r="9" fill="#ffffff" opacity=".53"/>'+ground+scene+'</svg>';
}
function mascot(size='large'){
 return '<svg class="viva-mascot '+(size==='small'?'small':'large')+'" viewBox="0 0 210 246" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilustração do VIVA acenando"><ellipse cx="106" cy="225" rx="74" ry="12" fill="#ebb99a" opacity=".25"/><circle cx="159" cy="30" r="17" fill="#ffcb73" opacity=".68"/><circle cx="44" cy="59" r="9" fill="#7edbbf" opacity=".75"/><path d="M55 76Q27 47 16 66" fill="none" stroke="#ffa25c" stroke-width="9" stroke-linecap="round"/><g class="viva-mascot-wave"><path d="M145 114Q174 95 178 58" fill="none" stroke="#e88354" stroke-width="18" stroke-linecap="round"/><circle cx="178" cy="50" r="14" fill="#ffbf93"/><path d="M171 45L166 28M177 43L178 21M184 46L191 27" stroke="#ffbf93" stroke-width="7" stroke-linecap="round"/></g><path d="M66 118Q28 135 37 168" fill="none" stroke="#e98957" stroke-width="19" stroke-linecap="round"/><circle cx="38" cy="172" r="12" fill="#ffbc8f"/><path d="M75 185L70 220M124 186L131 220" stroke="#374353" stroke-width="21" stroke-linecap="round"/><path d="M51 221Q65 210 86 221L88 232H52Q46 227 51 221ZM118 222Q138 208 158 221L159 233H120Q114 230 118 222Z" fill="#fff6f1" stroke="#344454" stroke-width="4"/><path d="M66 56Q109 45 151 65Q169 87 161 133L153 181Q107 207 58 183L51 125Q49 80 66 56Z" fill="#fd742e" stroke="#d45a29" stroke-width="4"/><path d="M65 61Q109 50 146 70" fill="none" stroke="#ffbb72" stroke-width="6" stroke-linecap="round"/><circle cx="82" cy="108" r="5.5" fill="#2e3441"/><circle cx="123" cy="108" r="5.5" fill="#2e3441"/><circle cx="69" cy="124" r="10" fill="#ffac86" opacity=".7"/><circle cx="136" cy="124" r="10" fill="#ffac86" opacity=".7"/><path d="M91 131Q103 144 118 130" fill="none" stroke="#543b41" stroke-width="5" stroke-linecap="round"/><path d="M85 157L101 146L119 155L115 176L94 178Z" fill="#fff2d0"/><path d="M100 151L105 164L113 165L106 171L107 178L100 173L94 177L95 169L88 164L98 163Z" fill="#fd9e38"/><path d="M63 68Q61 46 82 45Q118 37 145 61" stroke="#36414f" stroke-width="11" fill="none" stroke-linecap="round"/></svg>';
}
global.VivaVisual=Object.freeze({exercise,mascot,pose});
})(window);