export const usePrinter = () => {
  //For Reports/Tables (RBI Masterlist, etc.)
  const printTable = (title, columns, data, filterName = "All") => {
    if (!data || data.length === 0) return alert("No records to print.");

    const printWindow = window.open('', '_blank');
    const tableHeaders = columns.map(col => `<th>${col.header}</th>`).join('');
    const tableRows = data.map(item => `
      <tr>
        ${columns.map(col => {
          const value = item[col.key] || "";
          const style = col.style || "";
          return `<td style="${style}">${value}</td>`;
        }).join('')}
      </tr>
    `).join('');

    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 15px; margin-bottom: 25px; }
            .header h1 { margin: 0; font-size: 20px; text-transform: uppercase; letter-spacing: 1px; }
            .header p { margin: 5px 0 0; font-size: 12px; color: #64748b; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th { background: #f8fafc; border: 1px solid #000; padding: 10px 5px; font-size: 10px; text-transform: uppercase; }
            td { border: 1px solid #000; padding: 8px 5px; font-size: 10px; }
            .footer { margin-top: 50px; display: flex; justify-content: space-between; align-items: flex-end; }
            .sig-box { border-top: 1px solid #000; width: 200px; text-align: center; padding-top: 5px; font-size: 11px; font-weight: bold; }
          </style>
        </head>
        <body onload="window.print();">
          <div class="header">
            <h1>${title}</h1>
            <p>Filter: ${filterName} | Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <table>
            <thead><tr>${tableHeaders}</tr></thead>
            <tbody>${tableRows}</tbody>
          </table>
          <div class="footer">
            <div style="font-size: 10px;">Total Records: ${data.length}</div>
            <div class="sig-box uppercase">Barangay Captain</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  // For Official Certificates (Clearance, Indigency, etc.)
  const printCertificate = (resident, certType) => {
    const printWindow = window.open('', '_blank');
    const dateToday = new Date().toLocaleDateString('en-US', {
      month: 'long', day: 'numeric', year: 'numeric'
    });

    printWindow.document.write(`
      <html>
        <head>
          <title>${certType} - ${resident.name}</title>
          <style>
            @page { 
              size: portrait; 
              margin: 0; 
            }
            
            body { 
              font-family: 'Times New Roman', serif; 
              margin: 0;
              padding: 0;
              background-color: #f1f5f9; /* Light gray to see the paper in browser */
            }

            .page-container {
              width: 8.5in;
              height: 11in;
              margin: 0 auto;
              padding: 0.5in;
              box-sizing: border-box;
              background-color: white;
              display: flex;
              flex-direction: column;
            }

            .content-border {
              border: 4px double #000;
              padding: 40px;
              height: 100%;
              display: flex;
              flex-direction: column;
              box-sizing: border-box;
              position: relative;
            }

            .header { text-align: center; margin-bottom: 25px; }
            .header h2 { margin: 0; font-size: 14px; text-transform: uppercase; font-weight: normal; }
            .header h1 { margin: 2px 0; font-size: 22px; color: #065f46; text-transform: uppercase; font-weight: bold; }
            .header p { margin: 0; font-size: 12px; font-style: italic; }

            .cert-title { 
              text-align: center; 
              font-size: 28px; 
              font-weight: bold; 
              text-decoration: underline; 
              margin: 45px 0; 
              text-transform: uppercase; 
            }

            .body-content {
              flex: 1;
            }

            .body-text { 
              font-size: 17px; 
              text-align: justify; 
              margin-bottom: 25px; 
              text-indent: 50px;
              line-height: 1.6;
            }

            .salutation {
              font-size: 17px;
              font-weight: bold;
              margin-bottom: 25px;
            }

            .footer-section {
              margin-top: auto;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
              padding-bottom: 10px;
            }

            .sig-box { text-align: center; width: 250px; }
            .sig-name { 
              font-weight: bold; 
              font-size: 18px; 
              border-bottom: 1px solid #000; 
              text-transform: uppercase; 
              margin-bottom: 2px;
            }
            .sig-title { font-size: 13px; margin: 0; }

            .watermark { 
              position: absolute; 
              top: 50%; 
              left: 50%; 
              transform: translate(-50%, -50%) rotate(-45deg); 
              opacity: 0.05; 
              font-size: 80px; 
              font-weight: bold; 
              pointer-events: none; 
              width: 100%;
              text-align: center;
              z-index: 0;
            }

            @media print {
              body { background-color: white; }
              .page-container { margin: 0; width: 100%; height: 100vh; }
              @page { margin: 0; }
            }
          </style>
        </head>
        <body onload="window.print();">
          <div class="page-container">
            <div class="content-border">
              <div class="watermark">OFFICIAL DOCUMENT</div>
              
              <div class="header">
                <h2>Republic of the Philippines</h2>
                <h2>Province of Example</h2>
                <h1>Barangay Gulod</h1>
                <p>Office of the Barangay Captain</p>
              </div>

              <div class="cert-title">${certType}</div>

              <div class="body-content">
                <div class="salutation">TO WHOM IT MAY CONCERN:</div>
                
                <div class="body-text">
                  This is to certify that <b>${resident.name.toUpperCase()}</b>, of legal age, 
                  is a bonafide resident of <b>Purok ${resident.purok}, Barangay Gulod</b>.
                </div>

                <div class="body-text">
                  According to our records (Record of Inhabitants), the above-named person has no derogatory record filed 
                  in this office and is known to be a law-abiding citizen with good moral character.
                </div>

                <div class="body-text">
                  This certification is issued upon the request of the above-named person for 
                  <b>${certType === 'First Time Jobseeker (RA 11261)' ? 'FIRST TIME JOB SEEKING' : 'GENERAL PURPOSES'}</b> 
                  and for whatever legal purpose this may serve.
                </div>

                <div class="body-text">
                  Issued this <b>${dateToday}</b> at the Office of the Barangay Captain, 
                  Barangay Gulod.
                </div>
              </div>

              <div class="footer-section">
                <div class="sig-box" style="text-align: left;">
                  <p style="font-size: 11px; margin-bottom: 45px;">Thumbmark/Signature:</p>
                  <div style="border-bottom: 1px solid #000; width: 160px;"></div>
                </div>
                
                <div class="sig-box">
                  <div class="sig-name">HON. JUAN DELA CRUZ</div>
                  <p class="sig-title">Punong Barangay</p>
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return { printTable, printCertificate };
};