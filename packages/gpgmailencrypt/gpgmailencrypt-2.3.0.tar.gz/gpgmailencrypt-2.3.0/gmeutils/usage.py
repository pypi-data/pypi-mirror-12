#License GPL v3
#Author Horst Knorr <gpgmailencrypt@gmx.de>
from   .version			import *

###########
#show_usage
###########

def show_usage():
	"shows the command line options to stdout"
	print ("gpgmailencrypt")
	print ("===============")
	print ("License: GPL 3")
	print ("Author:  Horst Knorr <gpgmailencrypt@gmx.de>")
	print ("Version: %s from %s"%(VERSION,DATE))
	print ("\nUsage:\n")
	print ("gme.py [options] recipient@email.address < Inputfile_from_stdin")
	print ("or")
	print ("gme.py -f inputfile.eml [options] recipient@email.address")
	print ("\nOptions:\n")
	print ("-a --addheader:     adds a gpgmailencrypt version header to "
			"the mail")
	print ("-c f --config f:    use configfile 'f'. Default is")
	print ("                    /etc/gpgmailencrypt.conf")
	print ("-d --daemon :       start gpgmailencrypt as smtpserver")
	print ("-e pgpinline :      preferred encryption method, either ")
	print ("                    'pgpinline','pgpmime' or 'smime'")
	print ("-f mail :           reads email file 'mail', otherwise from stdin")
	print ("-h --help :         print this help")
	print ("-k f --keyhome f:   sets gpg key directory to 'f'")
	print ("-l t --log t:       print information into _logfile, with valid")
	print ("                    types 't' 'none','stderr','syslog','file'")
	print ("-n domainnames:     sets the used domain names (comma separated")
	print ("                    lists, no space), which should be encrypted,")
	print ("                    empty is all")
	print ("-m mailfile :       write email file to 'mailfile', otherwise")
	print ("                    email will be sent via smtp")
	print ("-o p --output p:    valid values for p are 'mail' or 'stdout',")
	print ("                    alternatively set an outputfile with -m")
	print ("--spamcheck=true:   if true, check if the e-mail is span")
	print ("-x --example:       print example config file")
	print ("-v --verbose:       print debugging information into _logfile")
	print ("--viruscheck=true:  if true, check if the e-mail contains a virus")
	print ("-z --zip:           zip attachments")
	print ("")

####################
#print_exampleconfig
####################

def print_exampleconfig():
	"prints an example config file to stdout"
	space=56

	print ("[default]")
	print ("prefered_encryption = pgpinline".ljust(space)+
	"#valid values are 'pgpinline','pgpmime' or 'smime'")
	print ("add_header = no".ljust(space)+
	"#adds a gpgmailencrypt version header to the mail")
	print ("domains =".ljust(space)+
	"#comma separated list of domain names,") 
	print ("".ljust(space)+
	"#that should be encrypted, empty is all")
	print ("homedomains=localhost".ljust(space)+
	"#a comma separated list of domains, for which this server is working ")
	print ("".ljust(space)+"#and users might receive system mail "
	"and can use pdf encrypt")
	print ("output=mail".ljust(space)+
	"#valid values are 'mail'or 'stdout'")
	print ("locale=en".ljust(space)+
	"#DA|DE|EN|ES|FI|FR|IT|NL|NO|PL|PT|RU|SV")
	print ("mailtemplatedir=/usr/share/gpgmailencrypt"
			"/mailtemplates".ljust(space)+
	"#directory where mail templates are stored")
	print ("systemmailfrom=gpgmailencrypt@localhost".ljust(space)+
	"#e-mail address used when sending system mails")
	print ("alwaysencrypt=False".ljust(space)+
	"#if True e-mails will be sent encrypted, even if there is no key")
	print ("".ljust(space)+
	"#Fallback encryption is encrypted pdf")

	print ("")
	print ("[gpg]")
	print ("keyhome = /var/lib/gpgmailencrypt/.gnupg".ljust(space)+
	"#home directory of public  gpgkeyring")
	print ("gpgcommand = /usr/bin/gpg2")
	print ("allowgpgcomment = yes".ljust(space)+
	"#allow a comment string in the GPG file")

	print ("")
	print ("[logging]")
	print ("log=none".ljust(space)+
	"#valid values are 'none', 'syslog', 'file' or 'stderr'")
	print ("file = /tmp/gpgmailencrypt.log")
	print ("debug = no")

	print ("")
	print ("[mailserver]")
	print ("host = 127.0.0.1".ljust(space)+"#smtp host")
	print ("port = 25".ljust(space)+"#smtp port")
	print ("authenticate = False".ljust(space)+
	"#user must authenticate")
	print ("smtpcredential =/etc/gpgmailencrypt.cfg".ljust(space)+
	"#file that keeps user and password information")    
	print("".ljust(space)+
	"#file format 'user=password'")

	print ("")
	print ("[encryptionmap]")
	print ("user@domain.com = PGPMIME".ljust(space)+
	"#PGPMIME|PGPINLINE|SMIME|PDF[:zipencryptionmethod]|NONE")
	print ("")
	print ("[usermap]")
	print (""
	"#user_nokey@domain.com = user_key@otherdomain.com")

	print ("")
	print ("[smime]")
	print ("keyhome = ~/.smime".ljust(space)+
	"#home directory of S/MIME public key files")
	print ("opensslcommand = /usr/bin/openssl")
	print ("defaultcipher = DES3".ljust(space)+
	"#DES3|AES128|AES192|AES256")
	print ("extractkey= no".ljust(space)+
	"#automatically scan emails and extract smime public keys to "
	"'keyextractdir'")
	print ("keyextractdir=~/.smime/extract")

	print ("")
	print ("[smimeuser]")
	print ("smime.user@domain.com = user.pem[,cipher]".ljust(space)+
	"#public S/MIME key file [,used cipher, see defaultcipher "
	"in the smime section]")

	print ("")
	print ("[pdf]")
	print ("passwordlength=10".ljust(space)+
	"#Length of the automatic created password")
	print ("passwordlifetime=172800".ljust(space)+
	"#lifetime for autocreated passwords in seconds. Default is 48 hours")
	print ("pdfpasswords=/etc/gpgpdfpasswords.pw".ljust(space)+
	"#file that includes users and passwords for permanent pdf passwords")

	print ("")
	print ("[zip]")
	print ("7zipcommand=/usr/bin7za".ljust(space)+
	"#path where to find 7za")
	print ("defaultcipher=ZipCrypto".ljust(space)+
	"#ZipCrypto|AES128||AES192|AES256")
	print ("compressionlevel=5".ljust(space)+
	"#1,3,5,7,9  with 1:lowest compression, but very fast, 9 is ")
	print ("".ljust(space)+
	"#highest compression, but very slow, default is 5")
	print ("securezipcontainer=False".ljust(space)+
	"#attachments will be stored in an encrypted zip file."
	" If this option is true,")
	print ("".ljust(space)+
	"#the directory will be also encrypted")
	print ("zipattachments=False".ljust(space)+
	"#if True all attachments will be zipped, independent "
	"from the encryption method")

	print ("")
	print ("[daemon]")
	print ("host = 127.0.0.1".ljust(space)+
	"#smtp host")
	print ("port = 10025".ljust(space)+
	"#smtp port")
	print ("smtps = False".ljust(space)+
	"#use smtps encryption")
	print ("starttls = False".ljust(space)+
	"#use starttls encryption")
	print ("forcetls = False".ljust(space)+
	"#communication (e.g. authentication) will be only possible after STARTTLS")
	print ("sslkeyfile = /etc/gpgsmtp.key".ljust(space)+
	"#the x509 certificate key file")
	print ("sslcertfile = /etc/gpgsmtp.crt".ljust(space)+
	"#the x509 certificate cert file")
	print ("authenticate = False".ljust(space)+
	"#users must authenticate")
	print ("smtppasswords = /etc/gpgmailencrypt.pw".ljust(space)+
	"#file that includes users and passwords")
	print ("admins=admin1,admin2".ljust(space)+
	"#comma separated list of admins, that can use the admin console")
	print ("statistics=1".ljust(space)+
	"#how often per day should statistical data be logged (0=none) max is 24")

	print ("")
	print ("[virus]")
	print ("checkviruses=False".ljust(space)+
	"#if true,e-mails will be checked for viruses before being encrypted")
	print ("quarantinelifetime=2419200".ljust(space)+
	"#how long an infected e-mail exists in the quarantine (in seconds)")
	print ("".ljust(space)+
	"#(default is 4 weeks). 0 deactivates automatic deletion")

	print ("")
	print ("[spam]")
	print ("spamscanner=spamassassin".ljust(space)+
	"#spamassassin|bogofilter")
	print ("checkspam=False".ljust(space)+
	"#if true, e-mails will be checked if they are spam")
	print ("sa_host=localhost".ljust(space)+
	"#server where spamassassin is running")
	print ("sa_port=783".ljust(space)+
	"#port of the spamassassin server")
	print ("sa_spamlevel=6.2".ljust(space)+
	"#spamassassin threshold for spam, "
	"values higher than that means the mail is spam")
	print ("sa_spamsuspectlevel=3.0".ljust(space)+
	"#spamassassin threshold for spam, values higher "
	"than that means the mail might be spam")
	print("".ljust(space)+"#(value must be smaller than 'spamlevel')")
	print ("maxsize=500000".ljust(space)+
	"#maximum size of e-mail,that will be checked if it is spam")
	print ("add_spamheader=False".ljust(space)+
	"#if True the e-mail gets spam headers")
	print ("change_subject=False".ljust(space)+
	"#if True, the subject of the mail will get a prefix")
	print ("spam_subject=***SPAM***".ljust(space)+
	"#subject prefix for spam")
	print ("spamsuspect_subject=***SPAMSUSPICION***".ljust(space)+
	"#subject prefix for suspected spam")

