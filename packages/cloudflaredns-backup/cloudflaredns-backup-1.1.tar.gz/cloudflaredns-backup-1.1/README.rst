CloudFlare DNS to Bind converter 
================================

Simple tool for backing up your CloudFlare hosted DNS records in format acceptable by BIND

Installation
------------

    pip install cloudflaredns-backup

Usage
-----

+   get all your CloudFlare zones to console
        
        cf-backup root@example.com 1234567890

+   get only example.com and example2.com zones
    
        cf-backup root@example.com 1234567890 -z example.com -z example2.com

    This example may be simplified as:
    
        cf-backup root@example.com 1234567890 -z "example1.com example2.com"

+   Get only example.com, create if not exists folder and write zone to ./zones/example.com
        
        cf-backup root@example.com 1234567890 -z example.com -o zones

