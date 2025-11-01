# GitFlow Workflow

## 1. Các nhánh chính

### 1.1. Main Branches (Nhánh chính)

#### **master** (hoặc main)
- Chứa code production, luôn stable
- Mỗi commit trên master là một phiên bản release
- **Chú ý:** Không được commit trực tiếp, chỉ merge từ `release` hoặc `hotfix`

#### **develop**
- Nhánh tích hợp, chứa code mới nhất đang phát triển
- Code base cho các feature mới
- **Chú ý:** Không được commit trực tiếp, chỉ merge từ `feature`, `release` hoặc `hotfix`

### 1.2. Supporting Branches (Nhánh hỗ trợ)

#### **Feature branches**
- **Mục đích:** Phát triển tính năng mới
- **Branch từ:** `develop`
- **Merge vào:** `develop`
- **Thời gian sống:** Tạm thời, xóa sau khi merge

#### **Release branches**
- **Mục đích:** Chuẩn bị cho production release
- **Branch từ:** `develop`
- **Merge vào:** `master` và `develop`
- **Thời gian sống:** Tạm thời, xóa sau khi release

#### **Hotfix branches**
- **Mục đích:** Sửa lỗi khẩn cấp trên production
- **Branch từ:** `master`
- **Merge vào:** `master` và `develop`
- **Thời gian sống:** Tạm thời, xóa sau khi merge

## 2. Quy tắc đặt tên nhánh

### 2.1. Feature branches

```
feature/<ticket-id>-<short-description>
```

**Ví dụ:**
- `feature/CR03-user-authentication`
- `feature/CR04-payment-integration`
- `feature/add-search-functionality`

### 2.2. Release branches

```
release/<version>
```

**Ví dụ:**
- `release/1.0.0`
- `release/2.3.0`
- `release/1.5.2`

### 2.3. Hotfix branches

```
hotfix/<version>-<short-description>
```

**Ví dụ:**
- `hotfix/1.0.1-fix-login-error`
- `hotfix/2.3.1-security-patch`
- `hotfix/1.5.3-payment-bug`

### 2.4. Quy tắc chung cho tên nhánh

- ✅ Sử dụng chữ thường (lowercase)
- ✅ Sử dụng dấu gạch ngang `-` để phân tách từ
- ✅ Ngắn gọn nhưng mô tả rõ ràng
- ✅ Bao gồm ticket ID nếu có

## 3. Quy tắc Commit Message

### 3.1. Conventional Commits Format

```
<type>(<scope>): <subject>
```

### 3.2. Các loại commit (type)

- **feat:** Tính năng mới
- **fix:** Sửa lỗi
- **style:** Formatting, ... (không ảnh hưởng code logic)
- **refactor:** Refactor code
- **perf:** Cải thiện performance
- **chore:** Thay đổi build process, tools, libraries
- **test:** Thêm test hoặc sửa test
- **docs:** Thay đổi documentation
- **build:** Changes to build scripts or dependencies
- **ci:** Thay đổi CI/CD configuration
- **revert:** Revert commit trước đó

### 3.3. Các loại scope (optional)

- **auth:** Authentication and authorization
- **ui:** User interface
- **api:** Backend or frontend APIs
- **core:** Core functionality
- **config:** Configuration files
- **deps:** Dependency updates
- **tests:** Testing
- **docs:** Documentation
- **db:** Database changes

### 3.4. Ví dụ commit message

```
feat(auth): add JWT token authentication
```

```
fix(payment): resolve transaction timeout issue
```

```
docs(readme): update installation instructions
```

### 3.5. Best practices cho commit

- ✅ Subject line không quá 50 ký tự
- ✅ Subject bắt đầu bằng động từ số nhiều (add, update, fix, remove)
- ✅ Mỗi commit cho một mục đích duy nhất
- ❌ Không commit code chưa hoàn chỉnh

## 4. Quy trình làm việc với GitFlow

### 4.1. Phát triển feature mới

```bash
# 1. Checkout develop và update
git checkout develop
git pull origin develop

# 2. Tạo feature branch
git checkout -b feature/CR03-new-feature

# 3. Làm việc và commit
git add .
git commit -m "feat(module): add new feature"

# 4. Push lên remote
git push origin feature/CR03-new-feature

# 5. Tạo Merge Request vào develop
```

### 4.2. Chuẩn bị release

```bash
# 1. Tạo release branch từ develop
git checkout develop
git pull origin develop
git checkout -b release/1.0.0

# 2. Update version, fix bugs nếu cần
git commit -m "chore(release): bump version to 1.0.0"

# 3. Merge vào master

# 4. Merge lại vào develop

# 5. Xóa release branch
```

### 4.3. Hotfix trên production

```bash
# 1. Tạo hotfix branch từ master
git checkout master
git pull origin master
git checkout -b hotfix/1.0.1-critical-bug

# 2. Fix bug và commit
git commit -m "fix(critical): resolve security vulnerability"

# 3. Merge vào master

# 4. Merge vào develop

# 5. Xóa hotfix branch
```

## 5. Quy tắc Merge Request (Pull Request)

### 5.1. Tiêu đề Merge Request

```
[<TYPE>] <Short Description>
```

**Ví dụ:**
- `[FEATURE] User authentication with JWT`
- `[BUGFIX] Fix payment gateway timeout`
- `[HOTFIX] Security vulnerability patch`

### 5.2. Mô tả Merge Request

**Template:**

```markdown
## Description
Mô tả ngắn gọn về thay đổi
```

### 5.3. Quy tắc Review và Approve

#### Reviewer responsibilities:
- ✅ Review code trong vòng 24h (workdays)
- ✅ Check logic, performance, security
- ✅ Check code style và conventions
- ✅ Để lại comments constructive

#### Author responsibilities:
- ✅ Assign reviewers phù hợp
- ✅ Response comments trong 24h
- ✅ Update code theo feedback
- ✅ Resolve conversations sau khi fix
- ✅ Không merge khi còn unresolved comments

#### Merge requirements:
- ✅ Ít nhất 1-2 approvals (tùy team size)
- ✅ No merge conflicts
- ✅ All conversations resolved
- ✅ Branch updated với base branch

## 6. Versioning Strategy (Semantic Versioning)

### 6.1. Format: MAJOR.MINOR.PATCH

```
v1.2.3
│ │ │
│ │ └─── PATCH: Bug fixes, hotfixes
│ └───── MINOR: New features (backward compatible)
└─────── MAJOR: Breaking changes
```

### 6.2. Quy tắc tăng version

- **MAJOR (1.0.0 → 2.0.0):** 
  - Breaking API changes
  - Incompatible changes
  - Major refactoring

- **MINOR (1.0.0 → 1.1.0):**
  - New features added
  - Backward compatible changes
  - Deprecated features

- **PATCH (1.0.0 → 1.0.1):**
  - Bug fixes
  - Security patches
  - Performance improvements

## 7. Best Practices

### 7.1. Code Review

1. **Keep PRs small:** Mỗi PR nên < 400 lines changed
2. **Review trong 24h:** Không để PR pending quá lâu
3. **Test trước khi review:** Reviewer nên pull code về test
4. **Constructive feedback:** Comment cụ thể, đề xuất giải pháp
5. **Praise good code:** Không chỉ comment lỗi

### 7.2. Commit Management

1. **Commit thường xuyên:** Mỗi logical change nên là một commit
2. **Meaningful messages:** Viết commit message rõ ràng
3. **Atomic commits:** Mỗi commit chỉ làm một việc
4. **Rebase before merge:** Giữ history clean
5. **Squash if needed:** Gộp commits nhỏ lẻ trước khi merge

### 7.3. Branch Management

1. **Delete merged branches:** Xóa branch sau khi merge xong
2. **Keep branches updated:** Thường xuyên rebase với develop
3. **Prefix branches:** Luôn sử dụng prefix (feature/, hotfix/, etc.)
4. **Short-lived branches:** Feature branch không nên tồn tại quá 2 weeks
5. **One feature per branch:** Không mix nhiều features

### 7.4. Conflict Resolution

```bash
# Update branch với base
git checkout feature/my-feature
git fetch origin
git rebase origin/develop

# Nếu có conflicts
# 1. Resolve conflicts trong files
# 2. Stage resolved files
git add .
# 3. Continue rebase
git rebase --continue

# Force push (cẩn thận!)
git push origin feature/my-feature --force-with-lease
```

### 7.5. Emergency Procedures

#### Revert một commit trên master:
```bash
git revert <commit-hash>
git push origin master
```

#### Rollback một release:
```bash
# Revert merge commit
git revert -m 1 <merge-commit-hash>
git push origin master

# Hoặc tạo hotfix với code cũ
```

## 8. Checklist cho Team

### 8.1. Before Starting Development
- [ ] Pull latest develop branch
- [ ] Create feature branch với naming convention đúng
- [ ] Understand requirements clearly

### 8.2. During Development
- [ ] Commit thường xuyên với meaningful messages
- [ ] Rebase với develop nếu có updates
- [ ] Self-review code trước khi push

### 8.3. Before Creating MR
- [ ] Lint code
- [ ] Update CHANGELOG
- [ ] Write clear MR description

### 8.4. After Creating MR
- [ ] Assign reviewers
- [ ] Respond to review comments promptly
- [ ] Update code theo feedback

### 8.5. After Merge
- [ ] Delete feature branch
- [ ] Update issue tracker
- [ ] Notify team nếu cần

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-01