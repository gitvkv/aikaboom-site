import os
import subprocess

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BASE_DIR = r"c:\Users\vivek\Downloads\Nvidia Project\File Structure"
ASSETS_DIR = os.path.join(BASE_DIR, "docs", "magazine", "assets")

os.makedirs(ASSETS_DIR, exist_ok=True)

# HTML Template for PDF Generation
HTML_TEMPLATE = """<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{title}</title>
    <style>
        @page {{
            size: A4 portrait;
            margin: 0;
        }}
        body {{
            margin: 0;
            padding: 0;
            background-color: #ffffff;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }}
        .ist-mag-container {{
            background-color: #ffffff !important;
            color: #1e293b !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            box-sizing: border-box;
            page-break-after: always;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }}
        .ist-mag-top-accent {{
            background-color: #f1f5f9;
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 15px;
            padding-right: 0;
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid #cbd5e1;
        }}
        .ist-mag-url-link {{
            color: #028090 !important;
            font-weight: 800 !important;
            font-size: 0.85em !important;
            text-decoration: none !important;
            margin-right: 15px;
        }}
        .ist-mag-top-badge {{
            background-color: #028090;
            color: #ffffff !important;
            font-weight: 800;
            font-size: 0.85em;
            letter-spacing: 0.12em;
            padding: 7px 25px 7px 35px;
            clip-path: polygon(15px 0, 100% 0, 100% 100%, 0 100%);
        }}
        .ist-mag-header-box {{
            background-color: #00a896 !important;
            color: #ffffff !important;
            padding: 24px 30px !important;
            margin: 20px 25px 20px 25px !important;
            border-radius: 4px !important;
        }}
        .ist-mag-header-box h1 {{
            color: #ffffff !important;
            font-size: 1.8em !important;
            font-weight: 900 !important;
            margin: 0 0 6px 0 !important;
        }}
        .ist-mag-header-box h2 {{
            color: #ffffff !important;
            font-size: 1.1em !important;
            margin: 0 0 12px 0 !important;
        }}
        .ist-mag-header-box .author {{
            color: #e0f2fe !important;
            font-size: 0.9em !important;
            font-weight: 700 !important;
            margin: 0 !important;
        }}
        .ist-mag-lead {{
            font-style: italic;
            font-size: 0.98em;
            line-height: 1.65;
            color: #0f172a !important;
            padding: 0 30px;
            margin-bottom: 22px;
        }}
        .ist-mag-content-body {{
            padding: 0 30px 25px 30px;
            flex-grow: 1;
        }}
        .ist-mag-cols {{
            column-count: 2;
            column-gap: 32px;
            font-size: 0.88em;
            line-height: 1.65;
            color: #1e293b !important;
        }}
        .ist-mag-heading {{
            color: #00a896 !important;
            font-size: 1.15em !important;
            font-weight: 800 !important;
            margin: 18px 0 8px 0 !important;
        }}
        .ist-mag-img {{
            width: 100%;
            max-height: 240px;
            object-fit: cover;
            border: 1px solid #cbd5e1;
            border-radius: 4px;
            display: block;
            margin: 12px 0 4px 0;
        }}
        .ist-mag-caption {{
            font-size: 0.76em;
            color: #64748b !important;
            font-style: italic;
            margin-bottom: 14px;
        }}
        .ist-mag-callout {{
            background-color: #f0fdf4 !important;
            border: 1px solid #bbf7d0 !important;
            border-left: 4px solid #00a896 !important;
            padding: 12px 16px;
            border-radius: 4px;
            margin: 16px 0;
        }}
        .ist-mag-callout h4 {{
            color: #028090 !important;
            font-size: 1.02em !important;
            margin: 0 0 6px 0 !important;
        }}
        .ist-mag-callout p {{
            color: #064e3b !important;
            font-size: 0.9em !important;
            margin: 0 !important;
        }}
        .ist-mag-table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 0.82em;
            margin: 16px 0;
        }}
        .ist-mag-table th {{
            background-color: #028090 !important;
            color: #ffffff !important;
            padding: 8px 12px;
            text-align: left;
        }}
        .ist-mag-table td {{
            padding: 7px 12px;
            border-bottom: 1px solid #e2e8f0;
            color: #0f172a !important;
        }}
        .ist-mag-footer {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 32px;
            background-color: #f8fafc;
            border-top: 3px solid #028090;
            padding: 0 25px;
            font-size: 0.78em;
            font-weight: 700;
            color: #475569 !important;
        }}
    </style>
</head>
<body>
{body}
</body>
</html>
"""

# Spectrum-X vs InfiniBand HTML Content
SPECTRUM_X_BODY = """
<!-- PAGE 1 -->
<div class="ist-mag-container">
    <div class="ist-mag-top-accent">
        <span class="ist-mag-url-link">www.aikaboom.com</span>
        <div class="ist-mag-top-badge">E-ARTICLES</div>
    </div>
    <div class="ist-mag-header-box">
        <h1>Spectrum-X vs. InfiniBand Quantum-X</h1>
        <h2>Part 1: The Great Interconnect Battle for Trillion-Parameter AI Superclusters</h2>
        <p class="author">AI Kaboom Technology Magazine</p>
    </div>
    <p class="ist-mag-lead">
        In the rapidly evolving landscape of artificial intelligence supercomputers, the choice between Lossless Ethernet (Spectrum-X) and native InfiniBand (Quantum-X) stands out as a vital architectural decision.
    </p>
    <div class="ist-mag-content-body">
        <div class="ist-mag-cols">
            <h3 class="ist-mag-heading">1. The Core Impasse of Distributed AI Training</h3>
            <p>In large-scale AI training across tens of thousands of GPUs, computational workloads are distributed across many server nodes. At every training step, GPUs must synchronize model weights and gradient updates through collective network operations.</p>
            <div class="ist-mag-callout">
                <h4>💡 Simple Rule of Thumb: Step Duration</h4>
                <p><strong>Total Training Time = GPU Compute Time + Network Sync Time</strong><br/>
                <em>In plain terms: No matter how fast your GPUs calculate math, if the network takes 25ms to sync gradients, all GPUs idle while waiting.</em></p>
            </div>
            <h3 class="ist-mag-heading">2. Incast Congestion & The Straggler Effect</h3>
            <p>In standard enterprise network switches, traffic is routed using static flow hashes. When multiple GPU nodes transmit heavy gradient bursts simultaneously, incast congestion occurs.</p>
            <div class="ist-mag-callout">
                <h4>💬 Key Executive Takeaway</h4>
                <p>"In a 100,000-GPU cluster, a single packet drop on a static hash route drops cluster-wide Model Flops Utilization (MFU) by up to 30%."</p>
            </div>
        </div>
    </div>
    <div class="ist-mag-footer">
        <span>Vol 5 No 1 | AI Kaboom Technology Magazine</span>
        <span>Page 1</span>
    </div>
</div>

<!-- PAGE 2 -->
<div class="ist-mag-container">
    <div class="ist-mag-top-accent">
        <span class="ist-mag-url-link">www.aikaboom.com</span>
        <div class="ist-mag-top-badge">E-ARTICLES</div>
    </div>
    <div class="ist-mag-header-box" style="background-color: #028090 !important;">
        <h1>Spectrum-X vs. InfiniBand Quantum-X</h1>
        <h2>Part 2: Deconstructing NVIDIA Spectrum-X Lossless Ethernet</h2>
        <p class="author">AI Kaboom Technology Magazine</p>
    </div>
    <div class="ist-mag-content-body">
        <div class="ist-mag-cols">
            <h3 class="ist-mag-heading">1. Spectrum-4 Switch Silicon Teardown</h3>
            <p>At the core of Spectrum-X is the <strong>NVIDIA Spectrum-4 Switch ASIC</strong>. Built on a 51.2 Tbps switching silicon architecture, Spectrum-4 delivers 64 ports of native 800Gbps OSFP.</p>
            <h3 class="ist-mag-heading">2. NVIDIA RoCE Adaptive Routing (AR)</h3>
            <p>Rather than relying on static flow hashes, Spectrum-4 switches continuously monitor queue depth and dynamically spray individual packets across all available parallel links.</p>
            <div class="ist-mag-callout">
                <h4>⚡ Wire-Speed Out-of-Order Reordering</h4>
                <p>ConnectX-7 / ConnectX-8 SuperNICs reorder packets on-the-fly directly into GPU VRAM via GPUDirect RDMA with zero CPU overhead.</p>
            </div>
        </div>
    </div>
    <div class="ist-mag-footer">
        <span>Vol 5 No 1 | AI Kaboom Technology Magazine</span>
        <span>Page 2</span>
    </div>
</div>

<!-- PAGE 3 -->
<div class="ist-mag-container">
    <div class="ist-mag-top-accent">
        <span class="ist-mag-url-link">www.aikaboom.com</span>
        <div class="ist-mag-top-badge">E-ARTICLES</div>
    </div>
    <div class="ist-mag-header-box" style="background-color: #0f172a !important;">
        <h1>Spectrum-X vs. InfiniBand Quantum-X</h1>
        <h2>Part 3: Deconstructing NVIDIA InfiniBand Architecture & SHARP v3</h2>
        <p class="author">AI Kaboom Technology Magazine</p>
    </div>
    <div class="ist-mag-content-body">
        <div class="ist-mag-cols">
            <h3 class="ist-mag-heading">1. Physical Layer Credit-Based Flow Control</h3>
            <p>InfiniBand is natively lossless: sender transmitters cannot send packets unless receiving port buffers issue explicit credits. Packet drops due to buffer overflow are physically impossible.</p>
            <h3 class="ist-mag-heading">2. NVIDIA SHARP v3 In-Network Compute</h3>
            <p>NVIDIA SHARP offloads mathematical gradient reduction operations directly onto switch silicon.</p>
            <div class="ist-mag-callout">
                <h4>💡 Plain-English Takeaway: SHARP Reduction</h4>
                <p><em>In plain terms: SHARP calculates gradient math inside switch chips while data is in transit, cutting network traffic in half and freeing GPUs for compute.</em></p>
            </div>
        </div>
    </div>
    <div class="ist-mag-footer">
        <span>Vol 5 No 1 | AI Kaboom Technology Magazine</span>
        <span>Page 3</span>
    </div>
</div>

<!-- PAGE 4 -->
<div class="ist-mag-container">
    <div class="ist-mag-top-accent">
        <span class="ist-mag-url-link">www.aikaboom.com</span>
        <div class="ist-mag-top-badge">E-ARTICLES</div>
    </div>
    <div class="ist-mag-header-box">
        <h1>Spectrum-X vs. InfiniBand Quantum-X</h1>
        <h2>Part 4: Architectural Decision Matrix & Performance Benchmarks</h2>
        <p class="author">AI Kaboom Technology Magazine</p>
    </div>
    <div class="ist-mag-content-body">
        <h3 class="ist-mag-heading">Architectural Comparison Matrix</h3>
        <table class="ist-mag-table">
            <thead>
                <tr>
                    <th>Feature</th>
                    <th>NVIDIA Spectrum-X (Ethernet)</th>
                    <th>NVIDIA InfiniBand (Quantum-X)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Protocol</strong></td>
                    <td>Enhanced RoCEv2</td>
                    <td>Native InfiniBand (IBA)</td>
                </tr>
                <tr>
                    <td><strong>Switch ASIC</strong></td>
                    <td>Spectrum-4 (51.2 Tbps)</td>
                    <td>Quantum-X800 (115.2 Tbps)</td>
                </tr>
                <tr>
                    <td><strong>Max Port Speed</strong></td>
                    <td>800Gbps OSFP</td>
                    <td>800Gbps XDR</td>
                </tr>
                <tr>
                    <td><strong>Flow Control</strong></td>
                    <td>Enhanced ECN & PFC</td>
                    <td>Credit-Based Lossless</td>
                </tr>
                <tr>
                    <td><strong>In-Network Compute</strong></td>
                    <td>Direct Data Placement</td>
                    <td>Hardware SHARP v3 Reduction</td>
                </tr>
            </tbody>
        </table>
        <div class="ist-mag-callout" style="background-color: #f0f9ff !important; border-color: #bae6fd !important;">
            <h4 style="color: #0284c7 !important;">🎯 Final Architectural Decision Guide</h4>
            <p style="color: #0369a1 !important;">
                <strong>Deploy Spectrum-X Ethernet if:</strong> You are building a multi-tenant AI cloud, integrating into existing enterprise Ethernet, or requiring BGP routing.<br/><br/>
                <strong>Deploy InfiniBand Quantum-X if:</strong> You are building a dedicated single-tenant AI SuperPOD focused exclusively on maximum MFU for trillion-parameter LLMs.
            </p>
        </div>
    </div>
    <div class="ist-mag-footer">
        <span>Vol 5 No 1 | AI Kaboom Technology Magazine</span>
        <span>Page 4</span>
    </div>
</div>
"""

def generate_pdf(title, body_html, output_pdf_name):
    full_html = HTML_TEMPLATE.format(title=title, body=body_html)
    temp_html_path = os.path.join(BASE_DIR, f"temp_{output_pdf_name}.html")
    pdf_out_path = os.path.join(ASSETS_DIR, output_pdf_name)

    with open(temp_html_path, "w", encoding="utf-8") as f:
        f.write(full_html)

    temp_html_url = temp_html_path.replace('\\', '/')
    cmd = [
        EDGE_PATH,
        "--headless",
        "--disable-gpu",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_out_path}",
        f"file:///{temp_html_url}"
    ]

    print(f"Generating PDF: {output_pdf_name}...")
    subprocess.run(cmd, check=True)

    if os.path.exists(temp_html_path):
        os.remove(temp_html_path)

    print(f"Successfully generated {pdf_out_path}")

if __name__ == "__main__":
    generate_pdf("Spectrum-X vs InfiniBand Quantum-X", SPECTRUM_X_BODY, "spectrum-x-vs-infiniband.pdf")
