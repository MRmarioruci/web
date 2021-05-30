# web
My personal website. You can use this template freely.

# SETUP
This projects runs on apache. Your virtual host conf file should look like this.

        <VirtualHost *:80>
                ErrorDocument 404 /404.php
                SetEnv DB_HOST 127.0.0.1
                SetEnv DB_NAME "ENTER YOUR DB NAME"
                SetEnv DB_USER "ENTER YOUR USERNAME"
                SetEnv DB_PASS "ENTER YOUR PASSWORD"
                SetEnv SMTP "ENTER STMP HOST"
                SetEnv MAIL_USERNAME "ENTER HOST EMAIL"
                SetEnv MAIL_PASS "ENTER HOST PASSWRD"

                DocumentRoot /var/www/html/web
                <Directory /var/www/html/YOUR FOLDER GOES HERE/>
                        AllowOverride All
                </Directory>
        </VirtualHost>

Some info should be changed inside the php/model.php file because there is no need for them to be on a database.
The rest you fill them in your database.

Enjoy.



