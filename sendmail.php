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
        $mail->Username   = 'office@jordland.com';   // إيميلك الرسمي
        $mail->Password   = 'M_1994.Lo';    // كلمة المرور من GoDaddy بالضبط
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // إعداد المرسل والمستقبل
        $mail->setFrom('office@jordland.com', 'JordLand Website');
        $mail->addAddress('office@jordland.com'); // نفس الإيميل لتوصلك الرسائل
        $mail->addReplyTo($email, $name);

        // محتوى الرسالة
        $mail->isHTML(true);
        $mail->Subject = '📩 رسالة جديدة من موقع JordLand';
        $mail->Body    = "
            <b>الاسم:</b> $name <br>
            <b>البريد:</b> $email <br>
            <b>الهاتف:</b> $phone <br><br>
            <b>الرسالة:</b><br>$message
        ";

        // حاول الإرسال
        if ($mail->send()) {
            echo 'success';
        } else {
            echo 'error';
        }
    } catch (Exception $e) {
        echo 'error: ' . $mail->ErrorInfo;
    }
}
?>
