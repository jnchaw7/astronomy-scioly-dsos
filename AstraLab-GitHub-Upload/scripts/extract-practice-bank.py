import json
import re
import sys
from pathlib import Path

from docx import Document

SOURCE = Path(sys.argv[1]) if len(sys.argv) > 1 else Path('Practice Test Questions.docx')
OUTPUT = Path(sys.argv[2]) if len(sys.argv) > 2 else Path('public/practice-bank.json')

CHOICE = re.compile(r'^\s*(?:\(?([A-Ha-h])\)|([A-Ha-h])[.)])\s*(.+)', re.S)
INLINE_CHOICE = re.compile(r'(?<![A-Za-z])(?:\(?([A-Ha-h])\)|([A-Ha-h])[.)])\s+')
NUMBERED_STATEMENT = re.compile(r'^\s*\d+[.)]\s+')
COMBINATION_ANSWER = re.compile(
    r'^(?:\d+(?:\s*(?:,|and|or)\s*\d+)+|all(?:\s+(?:are\s+)?correct)?|none(?:\s+(?:are\s+)?correct)?|both)$',
    re.I,
)
MISSING_VISUAL = re.compile(
    r'\b(?:image|picture|photograph|diagram|figure)\s*(?:above|below|shown|[A-Z]?\d+)?\b|'
    r'\b(?:graph|plot|light curve|spectrum)\s+(?:above|below|shown|provided)\b',
    re.I,
)


def clean(value):
    return re.sub(r'\s+', ' ', value or '').strip(' \t\n-')


def is_marked(run):
    if run.font.highlight_color is not None:
        return True
    color = run.font.color.rgb if run.font.color else None
    return bool(color and color[0] >= 150 and color[1] < 130 and color[2] < 130)


def marked_text(paragraph):
    return clean(' '.join(run.text for run in paragraph.runs if is_marked(run)))


def choice_parts(text):
    match = CHOICE.match(text)
    if not match:
        return None
    return (match.group(1) or match.group(2)).upper(), clean(match.group(3))


def split_inline(text):
    matches = list(INLINE_CHOICE.finditer(text))
    if len(matches) < 2:
        return None
    prompt = clean(text[:matches[0].start()])
    choices = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(text)
        choices.append(((match.group(1) or match.group(2)).upper(), clean(text[match.end():end])))
    return prompt, choices


def broad_topic(section):
    value = section.lower()
    if 'galax' in value or 'star cluster' in value:
        return 'Galaxies & star clusters'
    if 'variable' in value or any(name in value for name in ('cepheid', 'rr lyrae', 'mira')):
        return 'Variable stars'
    if 'compact' in value or any(name in value for name in ('black hole', 'neutron star', 'white dwarf')):
        return 'Compact objects'
    if 'distance' in value or 'standard candle' in value:
        return 'Distance methods'
    if 'spectra' in value or 'chemical composition' in value or 'electromagnetic' in value:
        return 'Spectra & light'
    if 'math' in value or 'calculation' in value:
        return 'Calculations'
    if 'binary' in value:
        return 'Binary systems'
    if 'orbital' in value:
        return 'Orbital mechanics'
    if 'cosmology' in value or 'universe' in value:
        return 'Cosmology'
    if 'telescope' in value or 'observation' in value or 'js-9' in value:
        return 'Telescopes & observation'
    if 'exoplanet' in value or 'extraterrestrial' in value:
        return 'Exoplanets'
    if 'brown dwarf' in value:
        return 'Brown dwarfs'
    if 'historical' in value or 'people' in value:
        return 'Astronomy history'
    if 'hr diagram' in value or 'classification' in value:
        return 'H-R diagrams & classification'
    if 'practice test' in value:
        return 'Mixed practice'
    return 'Stellar evolution'


def normalized(value):
    return re.sub(r'[^a-z0-9]+', '', value.lower())


def main():
    doc = Document(SOURCE)
    section = 'Stellar Evolution General Trends'
    subsection = ''
    items = []
    for source_index, paragraph in enumerate(doc.paragraphs):
        text = clean(paragraph.text)
        if not text:
            continue
        style = paragraph.style.name
        if style == 'Heading 2':
            section, subsection = text, ''
            continue
        if style == 'Heading 3':
            section, subsection = text, ''
            continue
        if style == 'Heading 4':
            subsection = text
            continue
        items.append({'text': text, 'paragraph': paragraph, 'section': section, 'subsection': subsection, 'source_index': source_index})

    questions = []
    seen = set()

    def add(prompt, choices, answer, item):
        prompt, answer = clean(prompt), clean(answer)
        choices = [clean(choice) for choice in choices if clean(choice)]
        if len(prompt) < 12 or len(prompt) > 1400 or len(choices) < 2 or not answer:
            return
        if MISSING_VISUAL.search(prompt) or prompt.lower().endswith('definition bank'):
            return
        answer_norm = normalized(re.sub(r'^\(?[A-Ha-h]\)?[.)]?\s*', '', answer))
        matching = [choice for choice in choices if normalized(choice) == answer_norm or answer_norm in normalized(choice) or normalized(choice) in answer_norm]
        if not matching:
            return
        correct = min(matching, key=lambda value: abs(len(normalized(value)) - len(answer_norm)))
        key = normalized(prompt)
        if len(key) < 10 or key in seen:
            return
        seen.add(key)
        questions.append({
            'id': f"source-{item['source_index']}",
            'topic': broad_topic(item['section']),
            'section': item['section'],
            'subsection': item['subsection'],
            'prompt': prompt,
            'choices': choices,
            'answer': correct,
            'sourceParagraph': item['source_index'],
        })

    for index, item in enumerate(items):
        paragraph = item['paragraph']
        marked = marked_text(paragraph)
        if not marked:
            continue

        current_choice = choice_parts(item['text'])
        if current_choice:
            question_index = index - 1
            while question_index >= 0 and choice_parts(items[question_index]['text']):
                question_index -= 1
            if question_index < 0 or index - question_index > 9:
                continue
            question_item = items[question_index]
            if question_item['section'] != item['section']:
                continue
            choices = []
            cursor = question_index + 1
            while cursor < len(items) and len(choices) < 8:
                parsed = choice_parts(items[cursor]['text'])
                if not parsed:
                    break
                choices.append(parsed[1])
                cursor += 1
            prompt = question_item['text']
            prompt_item = question_item
            if (
                choices
                and NUMBERED_STATEMENT.match(prompt)
                and all(COMBINATION_ANSWER.fullmatch(choice) for choice in choices)
            ):
                fragments = [prompt]
                lookback = question_index - 1
                while lookback >= 0 and question_index - lookback <= 6:
                    prior = items[lookback]
                    if prior['section'] != item['section'] or choice_parts(prior['text']):
                        break
                    fragments.insert(0, prior['text'])
                    prompt_item = prior
                    if '?' in prior['text']:
                        break
                    lookback -= 1
                prompt = ' '.join(fragments)
            add(prompt, choices, current_choice[1], prompt_item)
            continue

        inline = split_inline(item['text'])
        if inline:
            prompt, parsed_choices = inline
            add(prompt, [choice for _, choice in parsed_choices], marked, item)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps({'source': SOURCE.name, 'count': len(questions), 'questions': questions}, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    counts = {}
    for question in questions:
        counts[question['topic']] = counts.get(question['topic'], 0) + 1
    print(json.dumps({'count': len(questions), 'topics': counts, 'bytes': OUTPUT.stat().st_size}, indent=2))
    for question in questions[:8]:
        print('\n', question)
    if len(questions) < 100:
        print('Too few verified questions extracted', file=sys.stderr)
        return 2
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
