Git 合并多个本地 Commit 的方法
适用于本地多个 commit 还未 push 到远程仓库的情况
方法1：git reset --soft（最简单）⭐
# 查看最近的commit（确认要合并几个）
git log --oneline

# 合并最近N个commit
git reset --soft HEAD~N

# 重新提交为一个commit
git commit -m "合并后的commit信息"
示例：
# 合并最近3个commit
git reset --soft HEAD~3
git commit -m "功能开发完成"
方法2：git rebase -i（最灵活）⭐
# 查看最近的commit历史
git log --oneline

# 交互式合并最近N个commit
git rebase -i HEAD~N

# 或者指定从某个commit开始
git rebase -i <commit-hash>
操作步骤：
1. 在编辑器中，将要合并的commit前的 pick 改为 squash（或 s）
2. 保存退出
3. 在新的编辑器中编辑合并后的commit信息
4. 保存退出完成合并
编辑器示例：
pick abc1234 第一个commit
squash def5678 第二个commit  
squash ghi9012 第三个commit
方法3：git merge --squash（适用于分支合并）
# 切换到目标分支
git checkout main

# 创建临时分支指向当前位置
git branch temp

# 重置到合并点之前
git reset --hard <base-commit>

# 使用squash合并
git merge --squash temp

# 提交合并结果
git commit -m "合并后的commit信息"

# 删除临时分支
git branch -d temp
方法4：git commit --amend（只合并最近2个）
# 只适用于合并最近的2个commit
git reset --soft HEAD~1
git commit --amend
注意事项 ⚠️
1. 仅限本地操作：确保这些commit还没有push到远程仓库
2. 操作前备份：
git branch backup-branch
3. 检查结果：
git log --oneline
git status
推荐使用场景
方法	适用场景	难度
git reset --soft	简单合并所有commit	⭐
git rebase -i	需要选择性合并、重排序	⭐⭐
git merge --squash	分支整体合并	⭐⭐⭐
git commit --amend	只合并最近2个commit	⭐
快速参考
# 最简单：合并最近3个commit
git reset --soft HEAD~3 && git commit -m "合并提交"

# 最灵活：交互式合并
git rebase -i HEAD~3

# 查看操作结果
git log --oneline -5
推荐新手使用方法1，有经验的开发者使用方法2。