-- The quote form now saves requests to quote_requests instead of opening an
-- email, so its confirmation copy changes.
update public.page_content
set content = content || jsonb_build_object(
  'sent_title', 'Request received.',
  'sent_text', 'Thank you — our team will call or email you within 24 hours on business days. Prefer chat? Send the same request on WhatsApp.',
  'sending', 'Sending…',
  'again', 'Send another request',
  'whatsapp_sent', 'Send on WhatsApp'
)
where key = 'home.contact';
