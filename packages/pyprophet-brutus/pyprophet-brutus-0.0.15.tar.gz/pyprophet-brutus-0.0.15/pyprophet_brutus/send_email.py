# encoding: utf-8
from __future__ import print_function

import tempfile
import smtplib
import os
import zipfile


from email import encoders
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication


def _zip(data, name):
    """creates temporary zipfile with one entry named "name", "data" is the content
    and returns the content of the zipfile as a binary string.
    """
    folder = tempfile.mkdtemp()
    path = os.path.join(folder, "data.zip")
    with zipfile.ZipFile(path, "w") as fh:
        fh.writestr(name, data)
    with open(path, "rb") as fh:
        return fh.read()


def send_result(from_, to, output, result_folder, logger):

    msg = MIMEMultipart()
    msg['Subject'] = 'pyrophet workflow on brutus.ethz.ch finished'
    msg['From'] = from_
    msg['To'] = to

    # create body
    pathes = []
    for name in os.listdir(result_folder):
        path = os.path.join(result_folder, name)
        pathes.append(path)

    pathes.sort()

    path = os.path.join(result_folder, "summary_stats.txt")
    if os.path.exists(path):
        with open(path, "r") as fp:
            txt = fp.read()
    else:
        txt = "no summary stat created"

    txt += "\n\npyprophet created the following result files: \n\n    %s" % "\n    ".join(pathes)
    txt += "\n\n"

    path = os.path.join(result_folder, "resource_summary.txt")
    if os.path.exists(path):
        with open(path, "r") as fp:
            txt += fp.read()
    else:
        txt += "no resource_summary file created !"

    msg.attach(MIMEText(txt))

    report = MIMEBase('application', 'zip')
    report.set_payload(_zip(output, "output.txt"))
    encoders.encode_base64(report)
    report.add_header('Content-Disposition', 'attachment', filename='output.zip')

    msg.attach(report)

    # create attachment
    data = MIMEText(output)
    data.add_header('Content-Disposition', 'attachment', filename="recorded_lsf_output.txt")
    msg.attach(data)

    # read pdf
    path = os.path.join(result_folder, "report.pdf")
    if os.path.exists(path):
        with open(path, "rb") as fp:
            data = fp.read()
            pdf = MIMEApplication(data, _subtype="pdf")
            pdf.add_header('Content-Disposition', 'attachment', filename=('utf-8', '', "report.pdf"))
            msg.attach(pdf)

    s = smtplib.SMTP('localhost')
    logger.info("connected successfully to mail server")
    s.sendmail(from_, to, msg.as_string())
    logger.info("sent email from %s to %s", from_, to)
    s.quit()

if __name__ == "__main__":
    import logging
    from_ = to = "schmittu@ethz.ch"
    output = "test output"
    result_folder = "/cluster/scratch_xp/public/schmittu/pyprophet_tmp/Sun_20_11_13_09_2015_tjTqPo/"
    send_result(from_, to, output, result_folder, logger=logging)
