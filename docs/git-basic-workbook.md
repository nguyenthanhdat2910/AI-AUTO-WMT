# Git Basic Workbook

Workbook nay ghi lai cac lenh Git co ban de dung hang ngay trong project.

## 1. Kiem tra trang thai

Xem branch hien tai va file dang thay doi:

```bash
git status
```

Xem ngan gon hon:

```bash
git status -sb
```

Xem branch hien tai:

```bash
git branch --show-current
```

Xem tat ca branch local:

```bash
git branch
```

Xem branch local kem upstream:

```bash
git branch -vv
```

## 2. Tao va chuyen branch

Tao branch moi tu branch hien tai:

```bash
git switch -c qc/devin
```

Chuyen sang branch da ton tai:

```bash
git switch qc/devin
```

Chuyen ve main:

```bash
git switch main
```

Lay branch moi nhat tu remote:

```bash
git fetch
```

Chuyen sang branch remote lan dau:

```bash
git switch -c qc/devin origin/qc/devin
```

## 3. Xem thay doi truoc khi commit

Xem file nao da thay doi:

```bash
git status
```

Xem noi dung thay doi:

```bash
git diff
```

Xem thay doi cua mot file:

```bash
git diff tests/specs/view-quest-list.wmt.spec.ts
```

Xem cac file da add vao stage:

```bash
git diff --staged
```

## 4. Add file vao commit

Add mot file:

```bash
git add tests/specs/view-quest-list.wmt.spec.ts
```

Add nhieu file:

```bash
git add tests/pages/ViewQuestListPage.ts tests/specs/view-quest-list.wmt.spec.ts
```

Add tat ca file thay doi:

```bash
git add .
```

Luu y: Truoc khi dung `git add .`, nen chay `git status` de tranh add nham file cache nhu `__pycache__`.

## 5. Commit

Commit voi message ngan gon:

```bash
git commit -m "Add view quest list automation"
```

Neu commit bao khong co file nao, kiem tra lai:

```bash
git status
```

## 6. Push len remote

Push lan dau cho branch moi va set upstream:

```bash
git push -u origin qc/devin
```

Push cac lan sau:

```bash
git push
```

Neu gap loi:

```text
fatal: The current branch ... has no upstream branch
```

Dung lenh:

```bash
git push -u origin ten-branch
```

Vi du:

```bash
git push -u origin feature/view-quest-list-automation
```

## 7. Pull code moi nhat

Cap nhat code moi nhat cua branch hien tai:

```bash
git pull
```

Lay thong tin remote nhung chua merge:

```bash
git fetch
```

Cap nhat main:

```bash
git switch main
git pull
```

## 8. Xem lich su commit

Xem log ngan gon:

```bash
git log --oneline
```

Xem 5 commit gan nhat:

```bash
git log --oneline -5
```

Xem commit moi nhat:

```bash
git show --stat
```

## 9. Bo add nham file

Bo stage mot file, khong xoa noi dung file:

```bash
git restore --staged path/to/file
```

Vi du:

```bash
git restore --staged scripts/__pycache__/
```

Bo stage tat ca file:

```bash
git restore --staged .
```

## 10. Xoa file khong can commit

Neu file la cache/untracked va khong can giu, xoa thu cong trong editor hoac File Explorer.

Kiem tra lai:

```bash
git status
```

Khong dung lenh xoa hang loat neu chua chac chan.

## 11. Workflow thuong dung

Lam feature moi:

```bash
git switch main
git pull
git switch -c qc/devin
```

Sau khi sua code:

```bash
git status
git diff
git add .
git commit -m "Add view quest list automation"
git push -u origin qc/devin
```

Lan sau tiep tuc tren cung branch:

```bash
git status
git add .
git commit -m "Update view quest list locators"
git push
```

## 12. Kiem tra da push chua

Xem branch co tracking remote khong:

```bash
git branch -vv
```

Xem status ngan gon:

```bash
git status -sb
```

Neu thay:

```text
## qc/devin...origin/qc/devin
```

va khong co `[ahead]`, nghia la local da dong bo voi remote.

Neu thay `[ahead 1]`, nghia la co commit local chua push:

```bash
git push
```

## 13. Lenh hay dung trong project nay

Chay test WMT:

```bash
npm run test:wmt
```

Chay mot spec WMT:

```bash
node node_modules\playwright\cli.js test tests/specs/view-quest-list.wmt.spec.ts --project=WMT --workers=1
```

Mo Playwright report:

```bash
npm run report
```

## 14. Merge branch qc/devin vao main

Dung khi ban da lam code tren branch `qc/devin` va muon dua code do vao branch `main`.

### Cach viet tung lenh

Chuyen sang branch `main`:

```bash
git checkout main
```

Lay code moi nhat cua `main` tu remote `origin`:

```bash
git pull origin main
```

Merge code tu branch `qc/devin` vao branch `main` hien tai:

```bash
git merge qc/devin
```

Push branch `main` sau khi merge len remote:

```bash
git push origin main
```

### Chuoi lenh day du

```bash
git checkout main
git pull origin main
git merge qc/devin
git push origin main
```

### Giai thich nhanh

- `git checkout main`: chuyen ve branch `main`.
- `git pull origin main`: cap nhat branch `main` local bang code moi nhat tren GitHub.
- `git merge qc/devin`: lay commit/code tu branch `qc/devin` merge vao `main`.
- `git push origin main`: day branch `main` da merge len GitHub.

### Kiem tra sau khi merge

Kiem tra branch hien tai:

```bash
git branch --show-current
```

Kiem tra trang thai:

```bash
git status -sb
```

Kiem tra `qc/devin` da nam trong `main` chua:

```bash
git merge-base --is-ancestor qc/devin main
```

Neu lenh tren khong in loi va exit code = 0, nghia la `qc/devin` da duoc merge vao `main`.

Co the xem log de xac nhan:

```bash
git log --oneline --decorate --graph --all -10
```
