---
title: openEuler系统安装配置-docker安装-docker显卡环境安装
date: 2024-10-24 10:00:00.0
copyright_author: houxiaozhao
copyright_author_href: https://github.com/houxiaozhao
copyright_url: https://cdtools.click
copyright_info: 此文章版权归houxiaozhao所有，如有转载，请注明来自原作者
tags:
  - openEuler
  - docker
  - 显卡
---

# 系统安装

## 制作启动盘https://www.iplaysoft.com/ventoy.html

## 安装系统

1.启动待安装的电脑/服务器。修改启动选项，进入 U 盘启动 2.选择要安装的系统。选择通用安装 3.然后从https://docs.openeuler.org/zh/docs/22.03_LTS_SP3/docs/Installation/%E5%AE%89%E8%A3%85%E6%8C%87%E5%AF%BC.html 的“安装引导界面”开始来进行安装配置

# 配置网络

> 参考 https://docs.openeuler.org/zh/docs/22.03_LTS_SP3/docs/Administration/%E9%85%8D%E7%BD%AE%E7%BD%91%E7%BB%9C.html

1.查看可用设备
nmcli dev status

2.配置动态 IP
nmcli connection add type ethernet con-name 连接名称 ifname 接口名称

3.激活配置
nmcli con up 连接名称

# 配置软件源

1.编辑 vi /etc/yum.repos.d/openEuler.repo

```ini
# 不通版本配置不同版本的源

[centos-extras]
name=Centos extras - $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/centos-vault/centos/8/extras/x86_64/os/
enabled=1
gpgcheck=0

[OS]
name=OS
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/OS/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/OS/$basearch/RPM-GPG-KEY-openEuler

[everything]
name=everything
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/everything/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/everything/$basearch/RPM-GPG-KEY-openEuler

[EPOL]
name=EPOL
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/EPOL/main/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/OS/$basearch/RPM-GPG-KEY-openEuler

[debuginfo]
name=debuginfo
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/debuginfo/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/debuginfo/$basearch/RPM-GPG-KEY-openEuler

[source]
name=source
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/source/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/source/RPM-GPG-KEY-openEuler

[update]
name=update
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/update/$basearch/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/OS/$basearch/RPM-GPG-KEY-openEuler

[update-source]
name=update-source
baseurl=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/update/source/
enabled=1
gpgcheck=1
gpgkey=http://mirrors.tuna.tsinghua.edu.cn/openeuler/openEuler-20.03-LTS-SP3/source/RPM-GPG-KEY-openEuler
```

2.更新本地软件列表

```bash
dnf list all
```

# 安装 SSH Server

```bash
dnf install openssh-server
systemctl enable sshd
systemctl start sshd
# 修改配置
vi /etc/ssh/sshd_config
# 以下配置取消注释，设为 yes
# AllowAgentForwarding yes
# AllowTcpForwarding yes
# GatewayPorts yes
# 重启 sshd
systemctl restart sshd
```

# 安装 docker

```bash
# 关闭防火墙
systemctl stop firewalld && systemctl disable firewalld
# 禁用 SELinux
sed -i 's/^SELINUX=enforcing/SELINUX=disabled/' /etc/selinux/config
# 配置软件源,内容在下一部分
vi /etc/yum.repos.d/docker-ce.repo
# 安装一些软件
dnf install dnf-plugins-core slirp4netns fuse-overlayfs container-selinux -y

# 如果提示
#  Error: Transaction test error:
#  file /usr/lib64/libasm.so.1 from install of elfutils-libs-0.190-3.oe2403.x86_64 conflicts with file from package elfutils-0.185-18.oe2203sp4.x86_64
#  file /usr/lib64/libdw.so.1 from install of elfutils-libs-0.190-3.oe2403.x86_64 conflicts with file from package elfutils-0.185-18.oe2203sp4.x86_64
# 运行这个 sudo yum swap elfutils-0.185-18.oe2203sp4.x86_64 elfutils-libs-0.190-3.oe2403.x86_64
# 安装docker
yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y
# 安装nvidia-container-toolkit 如果遇到网络问题 可以手动编辑/etc/yum.repos.d/nvidia-container-toolkit.repo
curl -s -L https://nvidia.github.io/libnvidia-container/stable/rpm/nvidia-container-toolkit.repo |   sudo tee /etc/yum.repos.d/nvidia-container-toolkit.repo
# 如果下载错误，需要使用代理，请替换为自己的ip
# export https_proxy=http://192.168.31.127:7890 http_proxy=http://192.168.31.127:7890 all_proxy=socks5://192.168.31.127:7890
dnf install nvidia-container-toolkit nvidia-docker2 -y
# 修改配置,内容在下边
vi /etc/docker/daemon.json
# 重启docker
systemctl daemon-reload
systemctl restart docker
```

```ini
# /etc/yum.repos.d/docker-ce.repo
# 不通版本配置不同版本的源
[docker-ce-stable]
name=Docker CE Stable - $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/$basearch/stable
enabled=1
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-stable-debuginfo]
name=Docker CE Stable - Debuginfo $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/debug-$basearch/stable
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-stable-source]
name=Docker CE Stable - Sources
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/source/stable
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-test]
name=Docker CE Test - $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/$basearch/test
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-test-debuginfo]
name=Docker CE Test - Debuginfo $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/debug-$basearch/test
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-test-source]
name=Docker CE Test - Sources
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/source/test
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-nightly]
name=Docker CE Nightly - $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/$basearch/nightly
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-nightly-debuginfo]
name=Docker CE Nightly - Debuginfo $basearch
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/debug-$basearch/nightly
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg

[docker-ce-nightly-source]
name=Docker CE Nightly - Sources
baseurl=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/8/source/nightly
enabled=0
gpgcheck=1
gpgkey=https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/centos/gpg
```

```json
# /etc/docker/daemon.json
{
  "data-root": "/data/docker",
  "registry-mirrors": ["https://docker.1panel.dev"],
  "default-runtime": "nvidia",
  "runtimes": {
    "nvidia": {
      "path": "nvidia-container-runtime",
      "runtimeArgs": []
    }
  },
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2",
  "exec-opts": ["native.cgroupdriver=systemd"]
}
```

```ini
# /etc/yum.repos.d/nvidia-container-toolkit.repo
[nvidia-container-toolkit]
name=nvidia-container-toolkit
baseurl=https://nvidia.github.io/libnvidia-container/stable/rpm/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://nvidia.github.io/libnvidia-container/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt

[nvidia-container-toolkit-experimental]
name=nvidia-container-toolkit-experimental
baseurl=https://nvidia.github.io/libnvidia-container/experimental/rpm/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=0
gpgkey=https://nvidia.github.io/libnvidia-container/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt

```
