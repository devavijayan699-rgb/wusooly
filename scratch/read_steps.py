import json

with open(r'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.system_generated/logs/transcript_full.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        idx = data.get('step_index')
        if idx in [4364, 4420]:
            print(f'=== Step {idx} ===')
            for tc in data.get('tool_calls', []):
                args = tc.get('arguments', {})
                print('Path:', args.get('Path'))
                print('Target:\n', args.get('Target'))
                print('Replacement:\n', args.get('Replacement'))
