package com.ps.common.components;

import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Scope("prototype")
public class MailService
{
    private static final Logger LOG = Logger.getLogger(MailService.class);

    /**
     * mailSender instanceOf JavaMailSenderImpl
     */
    @Autowired
    private JavaMailSenderImpl mailSender;

    /**
     * mailTemplate instanceOf SimpleMailMessage
     */
    @Autowired
    private SimpleMailMessage mailTemplate;

    /**
     * @param mailSender the mailSender to set
     */
    public void setMailSender(JavaMailSenderImpl mailSender)
    {
        this.mailSender = mailSender;
    }

    /**
     * @param mailTemplate the mailTemplate to set
     */
    public void setMailTemplate(SimpleMailMessage mailTemplate)
    {
        this.mailTemplate = mailTemplate;
    }

    /**
     * This method is used to send mail with attachments
     * 
     * @throws MailException
     */
    public boolean sendMail(String[] toAddresses, String[] ccAddresses, String subject, String content,String filePath,String fileName) throws MailException
    {
        try
        {
            mailTemplate.setTo(toAddresses);
            mailTemplate.setFrom(mailSender.getUsername());
            SimpleMailMessage msg = new SimpleMailMessage(this.mailTemplate);
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(msg.getFrom());
            helper.setTo(msg.getTo());
            if (ccAddresses != null)
            helper.setCc(ccAddresses);

            helper.setSubject(subject);
            helper.setText(content.toString(), true);
            if ((filePath != null && !"".equals(filePath)))
            {
                addAttachment(helper,filePath, fileName);
            }
            
            mailSender.send(message);
            LOG.info("Mail has been sent to " + toAddresses[0]);
            return true;
        }
        catch (Exception ex)
        {
            LOG.info(ex.getCause(), ex);
            return false;
        }
    }

    /**
     * Used to add attachments to the mail
     * 
     * @param helper
     * @param attachment
     */
    public void addAttachment(MimeMessageHelper helper,String filePath, String fileName)
    {
        try
        {
        	DataSource source =  new FileDataSource(filePath); 
      	    helper.addAttachment(fileName, source);
        }
        catch (Exception e)
        {
            LOG.error("Exception while adding attachments to mail..." + e.getMessage());
            e.printStackTrace();
        }
    }

}
