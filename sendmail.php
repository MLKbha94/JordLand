<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = trim($_POST['name']);
    $email   = trim($_POST['email']);
    $phone   = trim($_POST['phone']);
    $message = trim($_POST['message']);

    $mail = new PHPMailer(true);

    try {
        // إعدادات SMTP الخاصة بـ cPanel
        $mail->isSMTP();
        $mail->Host       = 'mail.jordland.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'office@jordland.com';
        $mail->Password   = 'كلمة_المرور_الحقيقية_من_cPanel';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // SSL
        $mail->Port       = 465;

        // بيانات المرسل والمستقبل
        $mail->setFrom('office@jordland.com', 'JordLand Website');
        $mail->addAddress('office@jordland.com');
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

        $mail->send();
        echo '✅ success';
    } catch (Exception $e) {
        echo "❌ Error: " . $mail->ErrorInfo;
    }
}
?>
