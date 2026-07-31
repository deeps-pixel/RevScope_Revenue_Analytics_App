import json
import sys
import glob

def extract_notebook(filename, out_f):
    out_f.write(f"\n{'='*20} {filename} {'='*20}\n")
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            nb = json.load(f)
        for i, cell in enumerate(nb.get('cells', [])):
            if cell['cell_type'] == 'markdown':
                out_f.write(f'--- Markdown {i} ---\n')
                out_f.write(''.join(cell.get('source', [])) + '\n')
            elif cell['cell_type'] == 'code':
                outputs = cell.get('outputs', [])
                if outputs:
                    out_f.write(f'--- Code Output {i} ---\n')
                for output in outputs:
                    if output.get('output_type') == 'stream':
                        val = output.get('text', '')
                        if isinstance(val, list): val = ''.join(val)
                        out_f.write(val + '\n')
                    elif output.get('output_type') in ['execute_result', 'display_data']:
                        data = output.get('data', {})
                        if 'text/plain' in data:
                            val = data['text/plain']
                            if isinstance(val, list): val = ''.join(val)
                            out_f.write(val + '\n')
    except Exception as e:
        out_f.write(f"Error reading {filename}: {e}\n")

if __name__ == '__main__':
    files = sorted(glob.glob("IS_4007_Module_*.ipynb"))
    with open('extract_results_utf8.txt', 'w', encoding='utf-8') as out_f:
        for f in files:
            extract_notebook(f, out_f)
