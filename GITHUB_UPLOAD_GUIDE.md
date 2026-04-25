# 将行程规划桌宠项目上传到GitHub并自动打包

## 步骤1：创建GitHub仓库

1. **登录GitHub**：访问 https://github.com 并登录您的账户

2. **创建新仓库**：
   - 点击右上角的 "+" 按钮
   - 选择 "New repository"
   - 填写仓库名称（例如：trip-planner-pet）
   - 选择 "Public" 或 "Private"
   - 点击 "Create repository"

## 步骤2：上传项目文件

### 方法A：使用GitHub Desktop（推荐）

1. **下载并安装GitHub Desktop**：https://desktop.github.com/

2. **克隆仓库**：
   - 打开GitHub Desktop
   - 点击 "Clone a repository from the Internet..."
   - 输入您的仓库URL（例如：https://github.com/您的用户名/trip-planner-pet.git）
   - 选择本地路径（例如：d:\howtodo）

3. **添加文件**：
   - 确保所有文件都在仓库目录中
   - 在GitHub Desktop中，您会看到所有文件被标记为 "Changes"

4. **提交并推送**：
   - 在 "Summary" 中输入 "Initial commit"
   - 点击 "Commit to main"
   - 点击 "Push origin"

### 方法B：使用命令行

1. **打开PowerShell**，运行以下命令：

```powershell
# 进入项目目录
cd d:\howtodo

# 初始化git
git init

# 添加远程仓库
git remote add origin https://github.com/您的用户名/trip-planner-pet.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit"

# 推送
git push -u origin main
```

## 步骤3：设置GitHub Actions自动打包

1. **在GitHub仓库页面**：
   - 点击 "Actions" 标签
   - 点击 "New workflow"
   - 选择 "Set up a workflow yourself"

2. **创建工作流文件**：
   - 文件名设置为 `electron-build.yml`
   - 复制以下内容：

```yaml
name: Electron Build

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: windows-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18.x'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run dist:win
    
    - name: Upload artifact
      uses: actions/upload-artifact@v2
      with:
        name: trip-planner-pet
        path: dist/**
```

3. **点击 "Start commit"**：
   - 输入 "Add GitHub Actions workflow"
   - 点击 "Commit new file"

## 步骤4：触发打包并下载exe

1. **触发构建**：
   - 任何推送到main分支的更改都会自动触发构建
   - 您也可以在Actions页面手动触发

2. **下载构建结果**：
   - 进入Actions页面
   - 点击最新的构建
   - 在 "Artifacts" 部分，点击 "trip-planner-pet" 下载
   - 解压下载的文件，exe文件在 `win-unpacked` 目录中

## 步骤5：运行应用

1. 双击 `trip-planner-pet.exe` 文件
2. 应用会以桌宠模式运行在桌面上
3. 您可以拖拽窗口到任意位置

## 注意事项

- 首次运行时，应用会自动创建本地数据存储
- 应用默认始终置顶显示
- 数据保存在用户的AppData目录中
- 高优先级行程会在开始前30分钟、15分钟和5分钟发送提醒

现在您就拥有了一个完整的桌面版行程规划桌宠应用！
