<?php
require_once('connection.php');
require_once('model.php');
require_once 'vendor/dompdf/autoload.inc.php';
$data = Model\getData();
$profile = $data['profile'];
$links = $data['links'];

// create new PDF document

// reference the Dompdf namespace
use Dompdf\Dompdf;

// instantiate and use the dompdf class
$dompdf = new Dompdf();
$options = $dompdf->getOptions();
$dompdf->setOptions($options);
$html = '
<style type="text/css">
@font-face {
  font-family: "Lato", sans-serif;
  font-style: normal;
  font-weight: normal;
  src: url("https://fonts.googleapis.com/css2?family=Lato:wght@900&display=swap");
}
* {
  margin:0; padding:0;
}
body{
  font: 11px;
  font-family: "Poppins", sans-serif;
  padding: 12px;
  color: #424242;
}
a{
  color: #3689CF;
  text-decoration: none;
}
</style>';

$sk = "";
foreach($data['skills'] as $skill){
  $sk.="<li>".$skill['text']."</li>";
}
$lang = "";
foreach($data['languages'] as $language){
  $lang.="<li>".$language."</li>";
}
$experience = "";
foreach($data['experience'] as $exp){
  $experience.="
    <div style='margin: 5px;'>
      <div>
        <label style='font-size: 15px;font-weight: bold;'>".$exp['title']."</label>
        |
        <label style='font-size: 15px;color: #757575;'>".$exp['year']."</label>
      </div>
      <div style='margin-left: 15px;'>".$exp['text']."</div>
    </div>
  ";
}
$projects = "";
foreach($data['projects'] as $pro){
  $projects.="
    <div style='margin: 5px;'>
      <div>
        <label style='font-size: 15px;font-weight: bold;'>".$pro['title']."</label>
      </div>
      <p style='margin-left: 15px;'>".$pro['text']."</p>
      <div>
        <a target='_blank' href=".$pro['link'].">Learn more...</a>
      </div>
    </div>
  ";
}
$education = "";
foreach($data['education'] as $edu){
  $education.="
    <div style='margin: 5px;'>
      <div>
        <label style='font-size: 15px;font-weight: bold;'>".$edu['title']."</label>
      </div>
      <div>
        <label style='font-size: 15px;color: #757575;'>".$edu['year']."</label>
      </div>
      <p style='margin-left: 15px;'>".$edu['text']."</p>
    </div>
  ";
}
$html .="
<div style='width: 70%;display: inline-block;vertical-align: top;padding-right: 10px;margin-top: -20px;'>
	<h1 style='font-size: 35px;font-weight: bold;'>".$profile['name']."</h1>
	<p style='font-size: 20px;margin-top: -10px;'>".$profile['title']."</p>
  <div style='margin-top: 0px;color: #424242;'>
    ".$data['intro']."
  </div>
  <div style='margin-top: 10px;'>
    <div style='border-left:2px solid #3689CF;color: #3689CF;padding-left: 5px;font-size:13px;font-weight: 900;'>EXPERIENCE</div>
    <div style='margin-top: -10px;'>".$experience."</div>
  </div>
  <div style='margin-top: 10px;'>
   <div style='border-left:2px solid #3689CF;color: #3689CF;padding-left: 5px;font-size:13px;font-weight: 900;'>PROJECTS</div>
    <div style='margin-top: -10px'>".$projects."</div>
  </div>

</div>
<div style='width: 30%;display: inline-block;vertical-align: top;'>
	<div>
    G.Gennimata 3 Athens(Greece)
  </div>
  <div>
    <b>(31) 6949809063</b>
  </div>
  <div>
    <a target='_blank' href=".$links['website'].">Website</a><br>
    <a target='_blank' href=".$links['github'].">Github</a><br>
    <a target='_blank' href=".$links['linkedin'].">Linkedin</a><br>
    <b>".$links['email']."</b><br>
  </div>
  <div style='margin-top: 30px;'>
  <div style='border-left:2px solid #3689CF;color: #3689CF;padding-left: 5px;font-size:13px;font-weight: 900;'>Tools & Technologies</div>
    <br>
    <ul style='list-style: square;padding-left: 20px;'>
      ".$sk."
    </ul>
  </div>
  <div style='margin-top: 30px;'>
    <div style='border-left:2px solid #3689CF;color: #3689CF;padding-left: 5px;font-size:13px;font-weight: 900;'>LANGUAGES</div>
    <br>
    <ul style='list-style: square;padding-left: 20px;'>
      ".$lang."
    </ul>
  </div>
  <div style='margin-top: 20px;'>
    <div style='border-left:2px solid #3689CF;color: #3689CF;padding-left: 5px;font-size:13px;font-weight: 900;'>EDUCATION</div>
    <div>".$education."</div>
  </div>
</div>
<div style='width: 100%;vertical-align: top;padding-right: 10px'>
</div>
";


$dompdf->loadHtml($html);

// (Optional) Setup the paper size and orientation
$dompdf->setPaper('A4', 'portrait');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream($profile['name']."_Resume.pdf");

?>
