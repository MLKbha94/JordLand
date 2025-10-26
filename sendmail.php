<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/Exception.php';
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = trim($_POST['name']);
    $email   = trim($_POST['email']);
    $phone   = trim($_POST['phone']);
    $message = trim($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // إعدادات SMTP الخاصة بـ GoDaddy
        $mail->isSMTP();
        $mail->Host       = 'smtpout.secureserver.net'; 
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@jordland.com'; // ← حط بريدك الرسمي هون
        $mail->Password   = 'كلمة_مرور_الإيميل'; // ← كلمة مرور الإيميل من GoDaddy
        $mail->SMTPSecure = 'ssl';
        $mail->Port       = 465;

        // معلومات المرسل والمستقبل
        $mail->setFrom('info@jordland.com', 'JordLand Website');
        $mail->addAddress('info@jordland.com'); // البريد اللي توصله الرسائل
        $mail->addReplyTo($email, $name);

        // محتوى الرسالة
        $mail->isHTML(true);
        $mail->Subject = 'رسالة جديدة من نموذج التواصل - JordLand';
        $mail->Body    = "
            <b>الاسم:</b> $name <br>
            <b>البريد:</b> $email <br>
            <b>الهاتف:</b> $phone <br><br>
            <b>الرسالة:</b><br>$message
        ";

        $mail->send();
        echo 'success';
    } catch (Exception $e) {
        echo 'error';
    }
}
?>
